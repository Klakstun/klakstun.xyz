/* ═══════════════════════════════════════════
   音频导出工具 — WAV / MIDI
   ═══════════════════════════════════════════ */
(function() {
  'use strict';

  var toastTimer2 = null;

  function showToast(msg) {
    var toast = document.getElementById('toast');
    if (toastTimer2) clearTimeout(toastTimer2);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer2 = setTimeout(function() { toast.classList.remove('show'); toastTimer2 = null; }, 2000);
  }

  function getEditor() { return window.midiEditor || null; }

  function getNotes() {
    var ed = getEditor();
    return ed ? ed.getParsedNotes() : [];
  }

  function getBPM() {
    var ed = getEditor();
    return ed ? ed.getBPM() : 120;
  }

  function getSpeed() {
    var ed = getEditor();
    return ed ? ed.getSpeedMultiplier() : 1.0;
  }

  function getBaseFreq() {
    var ed = getEditor();
    return ed ? ed.getBaseFreq() : 261.63;
  }

  function getWaveform() {
    var ed = getEditor();
    return ed ? ed.getWaveform() : 'triangle';
  }

  function getVolume() {
    var ed = getEditor();
    return ed ? ed.getMasterVolume() : 0.8;
  }

  function getEffBPM() {
    return getBPM() * getSpeed();
  }

  window.audioExportRefresh = function() {
    var notes = getNotes();
    var effBPM = getEffBPM();
    var totalBeats = 0;
    var totalNotes = 0;
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].type === 'chord') {
        totalNotes += notes[i].notes.length;
      } else {
        totalNotes += 1;
      }
      totalBeats += notes[i].duration;
    }
    var durationSec = totalBeats * 60 / effBPM;

    document.getElementById('exportNoteCount').textContent = totalNotes;
    document.getElementById('exportTotalBeats').textContent = totalBeats.toFixed(1);
    document.getElementById('exportBPM').textContent = Math.round(effBPM);
    document.getElementById('exportDuration').textContent = durationSec.toFixed(1) + 's';

    var previewBox = document.getElementById('previewBox');
    var previewContent = document.getElementById('previewContent');
    var previewCount = document.getElementById('previewCount');

    if (notes.length === 0) {
      previewBox.classList.remove('show');
      return;
    }
    previewBox.classList.add('show');
    previewCount.textContent = totalNotes + window._t('audio.previewNotes');

    var lines = [];
    var t = window._t;
    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      if (n.type === 'chord') {
        lines.push((i + 1) + '.' + t('export.chord') + n.notes.length + t('export.notes') + n.duration.toFixed(2) + t('export.beats'));
        for (var ci = 0; ci < n.notes.length; ci++) {
          var cn = n.notes[ci];
          lines.push('    ' + cn.durFrac + ', ' + cn.pitchFrac + ', ' + cn.sizeStr + (cn.id ? ', ' + cn.id : ''));
        }
      } else {
        lines.push((i + 1) + '. ' + n.durFrac + ', ' + n.pitchFrac + ', ' + n.sizeStr + (n.id ? ', ' + n.id : ''));
      }
    }
    previewContent.textContent = lines.join('\n');
  };

  function encodeWAV(samples, sampleRate, bitDepth) {
    var bytesPerSample = bitDepth / 8;
    var numChannels = 1;
    var blockAlign = numChannels * bytesPerSample;
    var byteRate = sampleRate * blockAlign;
    var dataSize = samples.length * bytesPerSample;
    var bufferSize = 44 + dataSize;
    var buf = new ArrayBuffer(bufferSize);
    var view = new DataView(buf);

    function writeStr(offset, str) {
      for (var i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    }

    writeStr(0, 'RIFF');
    view.setUint32(4, bufferSize - 8, true);
    writeStr(8, 'WAVE');
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bytesPerSample * 8, true);
    writeStr(36, 'data');
    view.setUint32(40, dataSize, true);

    for (var i = 0; i < samples.length; i++) {
      var s = Math.max(-1, Math.min(1, samples[i]));
      if (bitDepth === 16) {
        var intVal = s < 0 ? s * 0x8000 : s * 0x7FFF;
        view.setInt16(44 + i * 2, intVal, true);
      } else if (bitDepth === 24) {
        var intVal = Math.round(s * 0x7FFFFF);
        view.setUint8(44 + i * 3, intVal & 0xFF);
        view.setUint8(44 + i * 3 + 1, (intVal >> 8) & 0xFF);
        view.setUint8(44 + i * 3 + 2, (intVal >> 16) & 0xFF);
      }
    }
    return buf;
  }

  window.exportWAV = async function() {
    var notes = getNotes();
    if (notes.length === 0) {
      showToast(window._t('toast.noExportNotes'));
      return;
    }

    var sampleRate = parseInt(document.getElementById('optSampleRate').value) || 44100;
    var bitDepth = parseInt(document.getElementById('optBitDepth').value) || 16;
    var effBPM = getEffBPM();
    var baseFreq = getBaseFreq();
    var waveform = getWaveform();
    var volume = getVolume();
    var beatDuration = 60 / effBPM;

    var totalBeats = 0;
    for (var i = 0; i < notes.length; i++) totalBeats += notes[i].duration;
    var totalDuration = totalBeats * beatDuration + 0.5;

    showToast(window._t('toast.generatingWAV2') + notes.length + window._t('export.notesParen'));

    var offlineCtx = new OfflineAudioContext(1, Math.ceil(totalDuration * sampleRate), sampleRate);

    var cumulativeTime = 0;
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
      if (note.type === 'chord') {
        for (var ci = 0; ci < note.notes.length; ci++) {
          var cn = note.notes[ci];
          var bf = (cn.noteBaseFreq !== undefined) ? cn.noteBaseFreq : baseFreq;
          var freq = bf * (cn.pitchNum / cn.pitchDen);
          var noteDuration = cn.duration * beatDuration;
          var velocity = cn.velocity / 100;
          var vol = velocity * volume;

          var osc = offlineCtx.createOscillator();
          osc.type = waveform;
          osc.frequency.setValueAtTime(freq, cumulativeTime);

          var osc2 = offlineCtx.createOscillator();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(freq * 2, cumulativeTime);

          var gain = offlineCtx.createGain();
          var adv = window.getAdvancedParams ? window.getAdvancedParams() : { attack: 0.02, release: 0.05, sustain: 0.7, harmonic: 0.15, fadeOut: 0.2 };
          var attackTime = Math.min(adv.attack, noteDuration * 0.1);
          var decayTime = Math.min(adv.release, noteDuration * 0.2);
          var sustainLevel = vol * adv.sustain;
          var fadeOutStart = 1 - adv.fadeOut;

          gain.gain.setValueAtTime(0, cumulativeTime);
          gain.gain.linearRampToValueAtTime(vol, cumulativeTime + attackTime);
          gain.gain.linearRampToValueAtTime(sustainLevel, cumulativeTime + attackTime + decayTime);
          gain.gain.setValueAtTime(sustainLevel, cumulativeTime + noteDuration * fadeOutStart);
          gain.gain.linearRampToValueAtTime(0, cumulativeTime + noteDuration);

          var gain2 = offlineCtx.createGain();
          gain2.gain.setValueAtTime(0, cumulativeTime);
          gain2.gain.linearRampToValueAtTime(vol * adv.harmonic, cumulativeTime + attackTime);
          gain2.gain.linearRampToValueAtTime(0, cumulativeTime + noteDuration * fadeOutStart);

          osc.connect(gain); osc2.connect(gain2);
          gain.connect(offlineCtx.destination); gain2.connect(offlineCtx.destination);

          osc.start(cumulativeTime); osc.stop(cumulativeTime + noteDuration + 0.05);
          osc2.start(cumulativeTime); osc2.stop(cumulativeTime + noteDuration * fadeOutStart + 0.05);
        }
        cumulativeTime += note.duration * beatDuration;
      } else {
        var bf = (note.noteBaseFreq !== undefined) ? note.noteBaseFreq : baseFreq;
        var freq = bf * (note.pitchNum / note.pitchDen);
        var noteDuration = note.duration * beatDuration;
        var velocity = note.velocity / 100;
        var vol = velocity * volume;

        var osc = offlineCtx.createOscillator();
        osc.type = waveform;
        osc.frequency.setValueAtTime(freq, cumulativeTime);

        var osc2 = offlineCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2, cumulativeTime);

        var gain = offlineCtx.createGain();
        var adv2 = window.getAdvancedParams ? window.getAdvancedParams() : { attack: 0.02, release: 0.05, sustain: 0.7, harmonic: 0.15, fadeOut: 0.2 };
        var attackTime = Math.min(adv2.attack, noteDuration * 0.1);
        var decayTime = Math.min(adv2.release, noteDuration * 0.2);
        var sustainLevel = vol * adv2.sustain;

        gain.gain.setValueAtTime(0, cumulativeTime);
        gain.gain.linearRampToValueAtTime(vol, cumulativeTime + attackTime);
        gain.gain.linearRampToValueAtTime(sustainLevel, cumulativeTime + attackTime + decayTime);
        gain.gain.setValueAtTime(sustainLevel, cumulativeTime + noteDuration * 0.8);
        gain.gain.linearRampToValueAtTime(0, cumulativeTime + noteDuration);

        var gain2 = offlineCtx.createGain();
        gain2.gain.setValueAtTime(0, cumulativeTime);
        gain2.gain.linearRampToValueAtTime(vol * 0.15, cumulativeTime + attackTime);
        gain2.gain.linearRampToValueAtTime(0, cumulativeTime + noteDuration * 0.5);

        osc.connect(gain); osc2.connect(gain2);
        gain.connect(offlineCtx.destination); gain2.connect(offlineCtx.destination);

        osc.start(cumulativeTime); osc.stop(cumulativeTime + noteDuration + 0.05);
        osc2.start(cumulativeTime); osc2.stop(cumulativeTime + noteDuration * 0.5 + 0.05);

        cumulativeTime += noteDuration;
      }
    }

    try {
      var rendered = await offlineCtx.startRendering();
      var samples = rendered.getChannelData(0);
      var wavBuffer = encodeWAV(samples, sampleRate, bitDepth);
      var blob = new Blob([wavBuffer], { type: 'audio/wav' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'midi-export-' + new Date().toISOString().slice(0, 10) + '.wav';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(window._t('toast.wavExported2') + notes.length + window._t('export.notesDone') + totalDuration.toFixed(1) + window._t('export.done'));
    } catch (e) {
      showToast(window._t('toast.wavFailed') + e.message);
      console.error(e);
    }
  };

  function freqToMidiNote(freq) {
    if (freq <= 0) return 69;
    return Math.round(69 + 12 * Math.log2(freq / 440));
  }

  function encodeVLQ(value) {
    var bytes = [];
    var v = value;
    bytes.push(v & 0x7F);
    v >>= 7;
    while (v > 0) { bytes.push((v & 0x7F) | 0x80); v >>= 7; }
    bytes.reverse();
    return bytes;
  }

  function buildMIDIBytes(format, numTracks, division, events) {
    var trackData = [];
    for (var i = 0; i < events.length; i++) {
      var vlq = encodeVLQ(events[i].delta);
      for (var j = 0; j < vlq.length; j++) trackData.push(vlq[j]);
      for (var j = 0; j < events[i].data.length; j++) trackData.push(events[i].data[j]);
    }
    var header = [0x4D, 0x54, 0x68, 0x64, 0x00, 0x00, 0x00, 0x06,
      (format >> 8) & 0xFF, format & 0xFF,
      (numTracks >> 8) & 0xFF, numTracks & 0xFF,
      (division >> 8) & 0xFF, division & 0xFF];
    var trackHeader = [0x4D, 0x54, 0x72, 0x6B];
    var trackLen = trackData.length;
    trackHeader.push((trackLen >> 24) & 0xFF, (trackLen >> 16) & 0xFF, (trackLen >> 8) & 0xFF, trackLen & 0xFF);
    return new Uint8Array(header.concat(trackHeader).concat(trackData));
  }

  window.exportMIDI = function() {
    var notes = getNotes();
    if (notes.length === 0) {
      showToast(window._t('toast.noExportNotes'));
      return;
    }

    var bpm = getBPM();
    var speed = getSpeed();
    var effBPM = bpm * speed;
    var baseFreq = getBaseFreq();
    var PPQN = 480;
    var tempo = Math.round(60000000 / effBPM);
    var noteLenMode = document.getElementById('optMidiNoteLen').value;

    var trackEvents = [];

    trackEvents.push({ delta: 0, data: [0xFF, 0x51, 0x03, (tempo >> 16) & 0xFF, (tempo >> 8) & 0xFF, tempo & 0xFF] });

    var nameBytes = [];
    var nameStr = 'MIDI Export';
    for (var i = 0; i < nameStr.length; i++) nameBytes.push(nameStr.charCodeAt(i));
    trackEvents.push({ delta: 0, data: [0xFF, 0x03].concat(nameBytes) });

    trackEvents.push({ delta: 0, data: [0xC0, 0] });

    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
      if (note.type === 'chord') {
        for (var ci = 0; ci < note.notes.length; ci++) {
          var cn = note.notes[ci];
          var bf = (cn.noteBaseFreq !== undefined) ? cn.noteBaseFreq : baseFreq;
          var freq = bf * (cn.pitchNum / cn.pitchDen);
          var midiNote = Math.max(0, Math.min(127, freqToMidiNote(freq)));
          trackEvents.push({ delta: 0, data: [0x90, midiNote, cn.velocity] });
        }
        var chordNoteOffs = [];
        for (var cj = 0; cj < note.notes.length; cj++) {
          var cjn = note.notes[cj];
          var bf = (cjn.noteBaseFreq !== undefined) ? cjn.noteBaseFreq : baseFreq;
          var freq = bf * (cjn.pitchNum / cjn.pitchDen);
          var midiNote = Math.max(0, Math.min(127, freqToMidiNote(freq)));
          var actualTicks;
          if (noteLenMode === 'fixed') {
            actualTicks = Math.round(PPQN / 2);
          } else {
            actualTicks = Math.round(cjn.duration * PPQN);
          }
          chordNoteOffs.push({ ticks: actualTicks, midiNote: midiNote });
        }
        chordNoteOffs.sort(function(a, b) { return a.ticks - b.ticks; });
        var prevTicks = 0;
        for (var ck = 0; ck < chordNoteOffs.length; ck++) {
          trackEvents.push({ delta: chordNoteOffs[ck].ticks - prevTicks, data: [0x80, chordNoteOffs[ck].midiNote, 0] });
          prevTicks = chordNoteOffs[ck].ticks;
        }
      } else {
        var bf = (note.noteBaseFreq !== undefined) ? note.noteBaseFreq : baseFreq;
        var freq = bf * (note.pitchNum / note.pitchDen);
        var midiNote = Math.max(0, Math.min(127, freqToMidiNote(freq)));
        var velocity = note.velocity;

        var noteTicks;
        if (noteLenMode === 'fixed') {
          noteTicks = Math.round(PPQN / 2);
        } else {
          noteTicks = Math.round(note.duration * PPQN);
        }

        trackEvents.push({ delta: (i === 0) ? 0 : 0, data: [0x90, midiNote, velocity] });
        trackEvents.push({ delta: noteTicks, data: [0x80, midiNote, 0] });
      }
    }

    trackEvents.push({ delta: 0, data: [0xFF, 0x2F, 0x00] });

    var midiBytes = buildMIDIBytes(0, 1, PPQN, trackEvents);
    var blob = new Blob([midiBytes], { type: 'audio/midi' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'midi-export-' + new Date().toISOString().slice(0, 10) + '.mid';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(window._t('toast.midiExported') + ' (' + notes.length + window._t('export.notesCount2') + Math.round(effBPM) + window._t('export.bpm'));
  };

})();