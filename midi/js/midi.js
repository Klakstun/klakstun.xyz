/* ═══════════════════════════════════════════
   MIDI 文本编辑器 — 核心引擎
   ═══════════════════════════════════════════ */
(function() {
  'use strict';

  var editor = document.getElementById('editor');
  var gutter = document.getElementById('gutter');
  var highlightOverlay = document.getElementById('highlightOverlay');
  var btnPlay = document.getElementById('btnPlay');
  var btnStop = document.getElementById('btnStop');
  var statusIndicator = document.getElementById('statusIndicator');
  var statusText = document.getElementById('statusText');
  var noteCount = document.getElementById('noteCount');
  var totalDuration = document.getElementById('totalDuration');
  var errorCount = document.getElementById('errorCount');
  var toast = document.getElementById('toast');
  var fileInput = document.getElementById('midiFileInput');

  var audioCtx = null;
  var isPlaying = false;
  var isPaused = false;
  var loopEnabled = false;
  var currentNoteIndex = 0;
  var scheduledNotes = [];
  var pauseTime = 0;
  var startTime = 0;
  var bpm = 120;
  var speedMultiplier = 1.0;
  var baseFreq = 261.63;
  var masterVolume = 0.8;
  var waveform = 'triangle';
  var parsedNotes = [];
  var parseErrors = [];
  var toastTimer = null;

  function getAudioContext() {
    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function ratioToFreq(num, den) {
    if (den === 0) den = 1;
    return baseFreq * (num / den);
  }

  function simplifyFraction(num, den) {
    if (den === 0) return { num: num, den: den };
    var g = gcd(num, den);
    return { num: num / g, den: den / g };
  }

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b > 0) { var t = b; b = a % b; a = t; }
    return a || 1;
  }

  function getEffectiveBPM() { return Math.round(bpm * speedMultiplier); }

  function scheduleNote(note, time) {
    var ctx = getAudioContext();
    var bf = (note.noteBaseFreq !== undefined) ? note.noteBaseFreq : baseFreq;
    var freq = bf * (note.pitchNum / note.pitchDen);
    var effBPM = getEffectiveBPM();
    var adv = window.getAdvancedParams ? window.getAdvancedParams() : { attack: 0.02, release: 0.05, sustain: 0.7, harmonic: 0.15, fadeOut: 0.2 };

    var osc = ctx.createOscillator();
    osc.type = waveform;
    osc.frequency.setValueAtTime(freq, time);

    var osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, time);

    var gain = ctx.createGain();
    var velocity = note.velocity / 100;
    var vol = velocity * masterVolume;
    var beatDuration = 60 / effBPM;
    var noteDuration = note.duration * beatDuration;

    var attackTime = Math.min(adv.attack, noteDuration * 0.1);
    var decayTime = Math.min(adv.release, noteDuration * 0.2);
    var sustainLevel = vol * adv.sustain;
    var fadeOutStart = 1 - adv.fadeOut;

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(vol, time + attackTime);
    gain.gain.linearRampToValueAtTime(sustainLevel, time + attackTime + decayTime);
    gain.gain.setValueAtTime(sustainLevel, time + noteDuration * fadeOutStart);
    gain.gain.linearRampToValueAtTime(0, time + noteDuration);

    var gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0, time);
    gain2.gain.linearRampToValueAtTime(vol * adv.harmonic, time + attackTime);
    gain2.gain.linearRampToValueAtTime(0, time + noteDuration * fadeOutStart);

    osc.connect(gain); osc2.connect(gain2);
    gain.connect(ctx.destination); gain2.connect(ctx.destination);

    osc.start(time); osc.stop(time + noteDuration + 0.05);
    osc2.start(time); osc2.stop(time + noteDuration * fadeOutStart + 0.05);

    return { osc: osc, osc2: osc2, gain: gain, gain2: gain2 };
  }

  function parseFraction(raw, defaultNum, defaultDen) {
    var trimmed = raw.trim();
    if (!trimmed) return { num: defaultNum, den: defaultDen, str: defaultNum + '/' + defaultDen };
    var match = trimmed.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (!match) return null;
    var num = parseInt(match[1], 10);
    var den = parseInt(match[2], 10);
    if (den === 0) return null;
    return { num: num, den: den, str: num + '/' + den };
  }

  function parseNoteLine(line, i) {
    var parts = line.split(',').map(function(s) { return s.trim(); });
    if (parts.length < 2) {
      parseErrors.push({ line: i, msg: window._t('error.format') });
      return null;
    }

    var durFrac = parseFraction(parts[0], 1, 1);
    if (!durFrac) {
      parseErrors.push({ line: i, msg: window._t('error.durFormat') });
      return null;
    }
    var duration = durFrac.num / durFrac.den;

    var pitchFrac = parseFraction(parts[1], 1, 1);
    if (!pitchFrac) {
      parseErrors.push({ line: i, msg: window._t('error.pitchFormat') });
      return null;
    }
    var freq = ratioToFreq(pitchFrac.num, pitchFrac.den);
    var simplified = simplifyFraction(pitchFrac.num, pitchFrac.den);

    var size = 10;
    var sizeStr = '10';
    if (parts.length >= 3 && parts[2] !== '') {
      var sizeRaw = parts[2];
      var sizeNum = parseInt(sizeRaw, 10);
      if (!isNaN(sizeNum) && sizeNum >= 1 && sizeNum <= 10 && /^\d{2}$/.test(sizeRaw)) {
        size = sizeNum; sizeStr = sizeRaw;
      } else {
        parseErrors.push({ line: i, msg: window._t('error.sizeFormat') });
        return null;
      }
    }
    var velocity = size * 10;

    var noteId = '';
    if (parts.length >= 4 && parts[3] !== '') {
      var idRaw = parts[3];
      if (/^\d{2}$/.test(idRaw)) { noteId = idRaw; }
      else {
        parseErrors.push({ line: i, msg: window._t('error.idFormat') });
        return null;
      }
    }

    return {
      type: 'note',
      line: i, duration: duration, durFrac: durFrac.str, durNum: durFrac.num, durDen: durFrac.den,
      pitchFrac: pitchFrac.str, pitchNum: pitchFrac.num, pitchDen: pitchFrac.den,
      pitchFracSimple: simplified.num + '/' + simplified.den, freq: freq,
      size: size, sizeStr: sizeStr, velocity: velocity, id: noteId, raw: line,
      noteBaseFreq: baseFreq
    };
  }

  function parseEditor() {
    var text = editor.value;
    var lines = text.split('\n');
    parsedNotes = [];
    parseErrors = [];
    var inChord = false;
    var chordOpenLine = -1;
    var chordNotes = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line === '' || line.indexOf('//') === 0 || line.indexOf('#') === 0) continue;

      if (line === '{') {
        if (inChord) {
          parseErrors.push({ line: i, msg: window._t('error.nestedChord') });
          continue;
        }
        inChord = true;
        chordOpenLine = i;
        chordNotes = [];
        continue;
      }

      if (line === '}') {
        if (!inChord) {
          parseErrors.push({ line: i, msg: window._t('error.unmatchedEnd') });
          continue;
        }
        if (chordNotes.length === 0) {
          parseErrors.push({ line: i, msg: window._t('error.emptyChord') });
          inChord = false;
          continue;
        }
        var maxDuration = 0;
        for (var ci = 0; ci < chordNotes.length; ci++) {
          if (chordNotes[ci].duration > maxDuration) maxDuration = chordNotes[ci].duration;
        }
        parsedNotes.push({
          type: 'chord',
          line: chordOpenLine,
          endLine: i,
          firstNoteLine: chordNotes[0].line,
          notes: chordNotes,
          duration: maxDuration,
          raw: lines.slice(chordOpenLine, i + 1).join('\n')
        });
        inChord = false;
        chordNotes = [];
        continue;
      }

      var freqMatch = line.match(/^\{R\+(\d+(?:\.\d+)?)\+HZ\}$/);
      if (freqMatch) {
        var newFreq = parseFloat(freqMatch[1]);
        if (newFreq > 0) {
          baseFreq = newFreq;
          document.getElementById('baseFreqInput').value = baseFreq;
          document.getElementById('baseFreqDisplay').textContent = baseFreq.toFixed(1) + ' Hz';
        }
        continue;
      }

      var noteObj = parseNoteLine(line, i);
      if (!noteObj) continue;

      if (inChord) {
        chordNotes.push(noteObj);
      } else {
        parsedNotes.push(noteObj);
      }
    }

    if (inChord) {
      parseErrors.push({ line: chordOpenLine, msg: window._t('error.unclosedChord') });
    }

    updateGutter(); updateStatusBar(); updateHighlightOverlay();
    return parsedNotes;
  }

  function updateGutter() {
    var lines = editor.value.split('\n');
    var errorLines = {};
    for (var i = 0; i < parseErrors.length; i++) errorLines[parseErrors[i].line] = true;
    var chordMarkers = {};
    for (var i = 0; i < parsedNotes.length; i++) {
      if (parsedNotes[i].type === 'chord') {
        chordMarkers[parsedNotes[i].line] = 'open';
        chordMarkers[parsedNotes[i].endLine] = 'close';
      }
    }
    var html = '';
    for (var i = 0; i < lines.length; i++) {
      var cls = '';
      if (errorLines[i]) cls += ' error';
      if (chordMarkers[i]) cls += ' chord-marker';
      html += '<div class="gutter-line' + cls + '">' + (i + 1) + '</div>';
    }
    gutter.innerHTML = html;
    gutter.scrollTop = editor.scrollTop;
  }

  function updateHighlightOverlay() {
    var style = getComputedStyle(editor);
    var lineHeight = parseFloat(style.getPropertyValue('--editor-lh').trim()) || 24;
    var padTop = parseFloat(style.paddingTop);
    var lines = editor.value.split('\n');
    var html = '';
    for (var i = 0; i < lines.length; i++) {
      html += '<div class="highlight-row" style="top:' + (padTop + i * lineHeight) + 'px;height:' + lineHeight + 'px"></div>';
    }
    highlightOverlay.innerHTML = html;
  }

  function highlightLine(index) {
    var rows = highlightOverlay.querySelectorAll('.highlight-row');
    for (var i = 0; i < rows.length; i++) rows[i].classList.remove('playing');
    var gutterLines = gutter.querySelectorAll('.gutter-line');
    for (var i = 0; i < gutterLines.length; i++) gutterLines[i].classList.remove('playing');

    if (index >= 0 && index < parsedNotes.length) {
      var item = parsedNotes[index];
      if (item.type === 'chord') {
        if (item.firstNoteLine < rows.length) rows[item.firstNoteLine].classList.add('playing');
        if (item.firstNoteLine < gutterLines.length) gutterLines[item.firstNoteLine].classList.add('playing');
        if (item.line < rows.length) rows[item.line].classList.add('chord-playing');
        if (item.line < gutterLines.length) gutterLines[item.line].classList.add('chord-playing');
        if (item.endLine < rows.length) rows[item.endLine].classList.add('chord-playing');
        if (item.endLine < gutterLines.length) gutterLines[item.endLine].classList.add('chord-playing');
        updateNoteInfo(item, index);
      } else {
        if (item.line < rows.length) rows[item.line].classList.add('playing');
        if (item.line < gutterLines.length) gutterLines[item.line].classList.add('playing');
        updateNoteInfo(item, index);
      }
    }
  }

  function clearHighlight() {
    var rows = highlightOverlay.querySelectorAll('.highlight-row');
    for (var i = 0; i < rows.length; i++) {
      rows[i].classList.remove('playing');
      rows[i].classList.remove('chord-playing');
    }
    var gutterLines = gutter.querySelectorAll('.gutter-line');
    for (var i = 0; i < gutterLines.length; i++) {
      gutterLines[i].classList.remove('playing');
      gutterLines[i].classList.remove('chord-playing');
    }
    clearNoteInfo();
  }

  function updateNoteInfo(note, index) {
    if (note.type === 'chord') {
      document.getElementById('infoLine').textContent = (index + 1) + ' / ' + parsedNotes.length + window._t('info.lineChord');
      document.getElementById('infoDurFrac').textContent = note.duration.toFixed(3) + window._t('info.beats');
      document.getElementById('infoDuration').textContent = note.notes.length + window._t('info.notes');
      document.getElementById('infoPitchFrac').textContent = window._t('info.chord');
      document.getElementById('infoPitchSimple').textContent = '\u2014';
      document.getElementById('infoFreq').textContent = '\u2014';
      document.getElementById('infoSize').textContent = '\u2014';
      document.getElementById('infoId').textContent = '\u2014';
    } else {
      document.getElementById('infoLine').textContent = (index + 1) + ' / ' + parsedNotes.length;
      document.getElementById('infoDurFrac').textContent = note.durFrac;
      document.getElementById('infoDuration').textContent = note.duration.toFixed(3) + window._t('info.beats');
      document.getElementById('infoPitchFrac').textContent = note.pitchFrac;
      document.getElementById('infoPitchSimple').textContent = note.pitchFrac !== note.pitchFracSimple ? note.pitchFracSimple : '\u2014';
      document.getElementById('infoFreq').textContent = note.freq.toFixed(2) + ' Hz';
      document.getElementById('infoSize').textContent = note.sizeStr + ' (' + window._t('info.velocity') + note.velocity + ')';
      document.getElementById('infoId').textContent = note.id || '-';
    }
  }

  function clearNoteInfo() {
    var ids = ['infoLine','infoDurFrac','infoDuration','infoPitchFrac','infoPitchSimple','infoFreq','infoSize','infoId'];
    for (var i = 0; i < ids.length; i++) document.getElementById(ids[i]).textContent = '-';
  }

  function updateStatusBar() {
    var totalNotes = 0;
    var totalBeats = 0;
    for (var i = 0; i < parsedNotes.length; i++) {
      if (parsedNotes[i].type === 'chord') {
        totalNotes += parsedNotes[i].notes.length;
      } else {
        totalNotes += 1;
      }
      totalBeats += parsedNotes[i].duration;
    }
    noteCount.textContent = window._t('status.notes') + totalNotes;
    totalDuration.textContent = window._t('status.total') + totalBeats.toFixed(1) + window._t('status.beats');
    if (parseErrors.length > 0) {
      errorCount.style.display = 'inline';
      errorCount.textContent = window._t('status.errors') + parseErrors.length;
    } else { errorCount.style.display = 'none'; }
  }

  function setStatus(state) {
    statusIndicator.className = 'status-indicator ' + state;
    if (state === 'ready') statusText.textContent = window._t('status.ready');
    else if (state === 'playing') statusText.textContent = window._t('status.playing');
    else if (state === 'paused') statusText.textContent = window._t('status.paused');
  }

  function play() {
    parseEditor();
    if (parsedNotes.length === 0) { showToast(window._t('toast.noNotes')); return; }

    var ctx = getAudioContext();
    isPlaying = true; isPaused = false;
    btnPlay.innerHTML = window._t('btn.pause');
    btnPlay.classList.add('accent2'); btnPlay.classList.remove('primary');
    btnStop.disabled = false;
    setStatus('playing');

    var now = ctx.currentTime;
    startTime = now;
    var cumulativeTime = 0;
    scheduledNotes = [];
    var effBPM = getEffectiveBPM();

    for (var i = 0; i < parsedNotes.length; i++) {
      var item = parsedNotes[i];
      if (item.type === 'chord') {
        for (var ci = 0; ci < item.notes.length; ci++) {
          var cn = item.notes[ci];
          var scheduled = scheduleNote(cn, now + cumulativeTime);
          scheduled.noteIndex = i;
          scheduled.startTime = now + cumulativeTime;
          scheduled.duration = cn.duration * (60 / effBPM);
          scheduled.isChord = true;
          scheduledNotes.push(scheduled);
        }
        cumulativeTime += item.duration * (60 / effBPM);
      } else {
        var noteStartTime = now + cumulativeTime;
        var scheduled = scheduleNote(item, noteStartTime);
        scheduled.noteIndex = i;
        scheduled.startTime = noteStartTime;
        scheduled.duration = item.duration * (60 / effBPM);
        scheduledNotes.push(scheduled);
        cumulativeTime += item.duration * (60 / effBPM);
      }
    }

    currentNoteIndex = 0;
    scheduleUIUpdates();
  }

  function scheduleUIUpdates() {
    if (!isPlaying || scheduledNotes.length === 0) return;
    var ctx = getAudioContext();
    var now = ctx.currentTime;

    var foundCurrent = false;
    for (var i = 0; i < scheduledNotes.length; i++) {
      var s = scheduledNotes[i];
      if (now < s.startTime + s.duration) {
        if (s.noteIndex !== currentNoteIndex) {
          currentNoteIndex = s.noteIndex;
          highlightLine(s.noteIndex);
        }
        foundCurrent = true;
        break;
      }
    }
    if (!foundCurrent) {
      if (loopEnabled) {
        // Loop: restart from beginning
        for (var k = 0; k < scheduledNotes.length; k++) {
          try { scheduledNotes[k].osc.stop(); } catch(e) {}
          try { scheduledNotes[k].osc2.stop(); } catch(e) {}
        }
        scheduledNotes = [];
        play();
      } else {
        stopPlayback();
      }
      return;
    }
    if (isPlaying) requestAnimationFrame(scheduleUIUpdates);
  }

  function pause() {
    if (!isPlaying) return;
    isPlaying = false; isPaused = true;
    for (var i = 0; i < scheduledNotes.length; i++) {
      try { scheduledNotes[i].osc.stop(); } catch(e) {}
      try { scheduledNotes[i].osc2.stop(); } catch(e) {}
    }
    scheduledNotes = [];
    pauseTime = audioCtx.currentTime - startTime;
    btnPlay.innerHTML = window._t('btn.resume');
    btnPlay.classList.add('primary'); btnPlay.classList.remove('accent2');
    btnStop.disabled = false;
    setStatus('paused');
  }

  function resume() {
    if (!isPaused) return;
    parseEditor();
    if (parsedNotes.length === 0) return;

    var ctx = getAudioContext();
    isPlaying = true; isPaused = false;
    btnPlay.innerHTML = window._t('btn.pause');
    btnPlay.classList.add('accent2'); btnPlay.classList.remove('primary');
    btnStop.disabled = false;
    setStatus('playing');

    var now = ctx.currentTime;
    startTime = now - pauseTime;
    var cumulativeTime = 0;
    scheduledNotes = [];
    var resumeFrom = currentNoteIndex;
    var effBPM = getEffectiveBPM();

    for (var i = 0; i < parsedNotes.length; i++) {
      var item = parsedNotes[i];
      var noteStartTime = now + cumulativeTime;
      if (i >= resumeFrom) {
        if (item.type === 'chord') {
          for (var ci = 0; ci < item.notes.length; ci++) {
            var cn = item.notes[ci];
            var scheduled = scheduleNote(cn, Math.max(now, noteStartTime));
            scheduled.noteIndex = i;
            scheduled.startTime = Math.max(now, noteStartTime);
            scheduled.duration = cn.duration * (60 / effBPM);
            scheduled.isChord = true;
            scheduledNotes.push(scheduled);
          }
        } else {
          var scheduled = scheduleNote(item, Math.max(now, noteStartTime));
          scheduled.noteIndex = i;
          scheduled.startTime = Math.max(now, noteStartTime);
          scheduled.duration = item.duration * (60 / effBPM);
          scheduledNotes.push(scheduled);
        }
      }
      cumulativeTime += item.duration * (60 / effBPM);
    }
    scheduleUIUpdates();
  }

  function togglePlay() {
    if (isPlaying) pause();
    else if (isPaused) resume();
    else play();
  }

  function toggleLoop() {
    loopEnabled = !loopEnabled;
    var btnLoop = document.getElementById('btnLoop');
    if (loopEnabled) {
      btnLoop.classList.add('loop-on');
      var onText = window._t('btn.loop.on');
      if (onText === 'btn.loop.on') onText = window._t('label.volume') === '音量' ? '🔁 循环:开' : '🔁 Loop:ON';
      btnLoop.innerHTML = onText;
    } else {
      btnLoop.classList.remove('loop-on');
      var offText = window._t('btn.loop');
      if (offText === 'btn.loop') offText = window._t('label.volume') === '音量' ? '🔁 循环' : '🔁 Loop';
      btnLoop.innerHTML = offText;
    }
  }

  function stopPlayback() {
    isPlaying = false; isPaused = false;
    for (var i = 0; i < scheduledNotes.length; i++) {
      try { scheduledNotes[i].osc.stop(); } catch(e) {}
      try { scheduledNotes[i].osc2.stop(); } catch(e) {}
    }
    scheduledNotes = []; currentNoteIndex = 0;
    btnPlay.innerHTML = window._t('btn.play');
    btnPlay.classList.add('primary'); btnPlay.classList.remove('accent2');
    btnStop.disabled = true;
    clearHighlight(); setStatus('ready');
  }

  function updateSpeedDisplay() {
    var eff = getEffectiveBPM();
    document.getElementById('speedBPM').textContent = window._t('sidebar.speedBPM') + eff;
    document.getElementById('bpmDisplay').textContent = bpm;
  }

  window.midiUpdateBPM = function(val) {
    bpm = Math.max(20, Math.min(400, parseInt(val) || 120));
    document.getElementById('bpmInput').value = bpm;
    document.getElementById('bpmSlider').value = bpm;
    updateSpeedDisplay();
    if (isPlaying) { stopPlayback(); play(); }
  };

  window.midiUpdateSpeed = function(val) {
    speedMultiplier = Math.max(0.25, Math.min(4.0, parseFloat(val) || 1.0));
    speedMultiplier = Math.round(speedMultiplier * 100) / 100;
    document.getElementById('speedSlider').value = speedMultiplier;
    document.getElementById('speedVal').textContent = speedMultiplier.toFixed(2) + 'x';
    updateSpeedDisplay();
    if (isPlaying) { stopPlayback(); play(); }
  };

  window.midiSetSpeedPreset = function(val) {
    speedMultiplier = parseFloat(val);
    document.getElementById('speedSlider').value = speedMultiplier;
    document.getElementById('speedVal').textContent = speedMultiplier.toFixed(2) + 'x';
    updateSpeedDisplay();
    if (isPlaying) { stopPlayback(); play(); }
  };

  window.midiUpdateBaseFreq = function(val) {
    baseFreq = Math.max(20, Math.min(2000, parseFloat(val) || 261.63));
    document.getElementById('baseFreqInput').value = baseFreq;
    document.getElementById('baseFreqDisplay').textContent = baseFreq.toFixed(1) + ' Hz';
    parseEditor();
    if (isPlaying) { stopPlayback(); play(); }
  };

  window.midiUpdateVolume = function(val) {
    masterVolume = parseInt(val) / 100;
    document.getElementById('volSlider').value = val;
    document.getElementById('volDisplay').textContent = val + '%';
  };

  window.midiUpdateWaveform = function(val) {
    waveform = val;
    if (isPlaying) { stopPlayback(); play(); }
  };

  window.midiLoadExample = function(type) {
    stopPlayback();
    var content = '';
    if (type === 'scale') {
      content = window._t('scale.comment') + '\n1/1,1/1,10,01\n1/1,9/8,10,02\n1/1,5/4,10,03\n1/1,4/3,10,04\n1/1,3/2,10,05\n1/1,5/3,10,06\n1/1,15/8,10,07\n1/1,2/1,10,08';
    } else if (type === 'melody') {
      content = window._t('melody.comment') + '\n1/1,1/1,10,01\n1/1,1/1,10,02\n1/1,3/2,09,03\n1/1,3/2,09,04\n1/1,5/3,08,05\n1/1,5/3,08,06\n2/1,3/2,08,07\n1/1,4/3,08,08\n1/1,4/3,08,09\n1/1,5/4,09,10\n1/1,5/4,09,11\n1/1,9/8,10,12\n1/1,9/8,10,13\n2/1,1/1,10,14';
    } else if (type === 'chords') {
      content = window._t('chords.comment');
    }
    editor.value = content;
    parseEditor();
    editor.focus();
    showToast(window._t('toast.exampleLoaded'));
  };

  window.midiClearEditor = function() {
    stopPlayback();
    editor.value = '';
    parseEditor();
    editor.focus();
  };

  window.midiImportFile = function() { fileInput.click(); };

  window.midiHandleFileImport = function(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      stopPlayback();
      editor.value = e.target.result;
      parseEditor();
      showToast(window._t('toast.fileImported') + file.name);
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  window.midiExportFile = function() {
    var content = editor.value;
    var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'midi-score-' + new Date().toISOString().slice(0,10) + '.txt';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(window._t('toast.fileExported'));
  };

  function showToast(msg) {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(function() { toast.classList.remove('show'); toastTimer = null; }, 2000);
  }

  // Refresh language-dependent UI
  function refreshLangUI() {
    // Update editor placeholder
    editor.placeholder = window._t('editor.placeholder');
    // Update status bar
    updateStatusBar();
    // Update speed display
    updateSpeedDisplay();
    // Update toolbar labels (now in header)
    var labels = document.querySelectorAll('header .toolbar-group label');
    if (labels.length >= 5) {
      labels[0].textContent = window._t('label.bpm');
      labels[1].textContent = window._t('label.baseFreq');
      labels[2].textContent = window._t('label.volume');
      labels[3].textContent = window._t('label.waveform');
    }
    // Update waveform select options
    var waveSelect = document.getElementById('waveSelect');
    if (waveSelect) {
      waveSelect.options[0].textContent = window._t('waveform.triangle');
      waveSelect.options[1].textContent = window._t('waveform.sine');
      waveSelect.options[2].textContent = window._t('waveform.square');
      waveSelect.options[3].textContent = window._t('waveform.sawtooth');
    }
    // Update button text
    if (!isPlaying && !isPaused) btnPlay.innerHTML = window._t('btn.play');
    else if (isPaused) btnPlay.innerHTML = window._t('btn.resume');
    else btnPlay.innerHTML = window._t('btn.pause');
    btnStop.innerHTML = window._t('btn.stop');
    var btnLoop = document.getElementById('btnLoop');
    if (btnLoop) {
      var loopText = window._t('btn.loop');
      if (loopText === 'btn.loop') loopText = window._t('label.volume') === '音量' ? '🔁 循环' : '🔁 Loop';
      var loopOnText = window._t('btn.loop.on');
      if (loopOnText === 'btn.loop.on') loopOnText = window._t('label.volume') === '音量' ? '🔁 循环:开' : '🔁 Loop:ON';
      btnLoop.innerHTML = loopEnabled ? loopOnText : loopText;
    }
    // Update status
    if (isPlaying) setStatus('playing');
    else if (isPaused) setStatus('paused');
    else setStatus('ready');
    // Update sidebar headings
    updateSidebarHeadings();
    // Update help box
    updateHelpBox();
    // Update audio export tab
    updateAudioExportLabels();
    // Update SSTV tab
    updateSSTVLabels();
  }

  function updateSidebarHeadings() {
    // Update sidebar tab buttons
    var sidebarTabs = document.querySelectorAll('.sidebar-tab');
    if (sidebarTabs.length >= 3) {
      sidebarTabs[0].textContent = window._t('sidebar.info');
      sidebarTabs[1].textContent = window._t('sidebar.tutorial');
      sidebarTabs[2].textContent = window._t('sidebar.about');
    }
    // Update note info panel headings
    var infoH3s = document.querySelectorAll('#sidebarPanelInfo h3');
    if (infoH3s.length >= 2) {
      infoH3s[0].textContent = window._t('sidebar.speed');
      infoH3s[1].textContent = window._t('sidebar.noteInfo');
    }
    // Update tutorial panel headings
    var tutorialH3s = document.querySelectorAll('#sidebarPanelTutorial h3');
    if (tutorialH3s.length >= 3) {
      tutorialH3s[0].textContent = window._t('sidebar.format');
      tutorialH3s[1].textContent = window._t('sidebar.shortcuts');
      tutorialH3s[2].textContent = window._t('sidebar.examples');
    }
    // Update note info labels
    document.getElementById('infoLine').parentElement.querySelector('.label').textContent = window._t('info.labelLine');
    var rows = document.querySelectorAll('.note-info-card .row');
    if (rows.length >= 8) {
      rows[0].querySelector('.label').textContent = window._t('info.labelLine');
      rows[1].querySelector('.label').textContent = window._t('info.labelDurFrac');
      rows[2].querySelector('.label').textContent = window._t('info.labelDuration');
      rows[3].querySelector('.label').textContent = window._t('info.labelPitchFrac');
      rows[4].querySelector('.label').textContent = window._t('info.labelPitchSimple');
      rows[5].querySelector('.label').textContent = window._t('info.labelFreq');
      rows[6].querySelector('.label').textContent = window._t('info.labelSize');
      rows[7].querySelector('.label').textContent = window._t('info.labelId');
    }
    // Speed panel
    var speedRow = document.querySelector('.speed-row span');
    if (speedRow) speedRow.textContent = window._t('sidebar.speedRate');
    updateSpeedDisplay();
  }

  function updateHelpBox() {
    var helpBox = document.querySelector('#sidebarPanelTutorial .help-box');
    if (!helpBox) return;
    var t = window._t;
    helpBox.innerHTML =
      '<p>' + t('format.help.line1') + '</p>' +
      '<p><code>' + t('info.labelDurFrac') + '</code>' + t('format.help.line2') + '<code>1/1</code></p>' +
      '<p style="font-size:0.7rem;margin-left:8px;"><code>1/1</code>' + t('format.help.line3') + '<code>1/2</code>' + t('format.help.line4') + '<code>1/8</code>' + t('format.help.line5') + '</p>' +
      '<p><code>' + t('info.labelPitchFrac') + '</code>' + t('format.help.line6') + '</p>' +
      '<p style="font-size:0.7rem;margin-left:8px;"><code>1/1</code>' + t('format.help.line7') + '<code>4/3</code>' + t('format.help.line8') + '<code>3/2</code>' + t('format.help.line9') + '<code>5/4</code>' + t('format.help.line10') + '</p>' +
      '<p><code>' + t('info.labelSize') + '</code> <code>01</code>~<code>10</code>' + t('format.help.line11') + '<code>10</code></p>' +
      '<p><code>' + t('info.labelId') + '</code>' + t('format.help.line12') + '<code>00</code>~<code>99</code>' + t('format.help.line13') + '</p>' +
      '<p style="margin-top:6px;">' + t('format.help.line14') + '</p>' +
      '<p style="margin-top:8px;color:var(--accent2);">' + t('format.help.chord') + '<code>{</code>' + t('format.help.chord2') + '<code>}</code>' + t('format.help.chord3') + '</p>' +
      '<p style="font-size:0.7rem;margin-left:8px;color:var(--accent2);">' + t('format.help.freq') + '<code>{R+' + t('info.labelFreq') + '+HZ}</code>' + t('format.help.freq2') + '</p>';
  }

  function updateAudioExportLabels() {
    var t = window._t;
    var audioTitle = document.querySelector('#tab-dir h1 span');
    if (audioTitle) audioTitle.textContent = t('audio.title');
    var subtitle = document.querySelector('#tab-dir .subtitle');
    if (subtitle) subtitle.textContent = t('audio.subtitle');
    var statLabels = document.querySelectorAll('#tab-dir .stat-label');
    if (statLabels.length >= 4) {
      statLabels[0].textContent = t('audio.statNotes');
      statLabels[1].textContent = t('audio.statBeats');
      statLabels[2].textContent = t('audio.statBPM');
      statLabels[3].textContent = t('audio.statDuration');
    }
    var previewTitle = document.getElementById('previewTitle');
    if (previewTitle) previewTitle.textContent = t('audio.preview');
    var optLabels = document.querySelectorAll('#tab-dir .options span');
    if (optLabels.length >= 3) {
      optLabels[0].textContent = t('audio.sampleRate');
      optLabels[1].textContent = t('audio.bitDepth');
      optLabels[2].textContent = t('audio.midiNoteLen');
    }
    var optMidi = document.getElementById('optMidiNoteLen');
    if (optMidi) {
      optMidi.options[0].textContent = t('audio.midiNoteLen.actual');
      optMidi.options[1].textContent = t('audio.midiNoteLen.fixed');
    }
  }

  function updateSSTVLabels() {
    var t = window._t;
    var sstvLabel = document.querySelector('#tab-sstv .sstv-editor-section label');
    if (sstvLabel) sstvLabel.textContent = t('sstv.label');
    var sstvTA = document.getElementById('sstvTextInput');
    if (sstvTA) sstvTA.placeholder = t('sstv.placeholder');
    var sstvOptLabels = document.querySelectorAll('#tab-sstv .sstv-options label');
    if (sstvOptLabels.length >= 2) {
      sstvOptLabels[0].textContent = t('sstv.charDuration');
      sstvOptLabels[1].textContent = t('sstv.volume');
    }
    var sstvHexLabel = document.querySelector('#tab-sstv .sstv-hex-label');
    if (sstvHexLabel) sstvHexLabel.textContent = t('sstv.hexPreview');
    // Update SSTV button text
    if (document.getElementById('sstvBtnPlay')) {
      var sstvBtnPlay = document.getElementById('sstvBtnPlay');
      var sstvIsPlaying = sstvBtnPlay.classList.contains('accent2');
      sstvBtnPlay.innerHTML = sstvIsPlaying ? t('sstv.pause') : t('sstv.play');
    }
    document.getElementById('sstvBtnStop').innerHTML = t('sstv.stop');
    document.getElementById('sstvBtnExport').innerHTML = t('sstv.export');
    // Update SSTV freq table header
    var freqTableThead = document.querySelector('#sstvFreqTable thead');
    if (freqTableThead) freqTableThead.innerHTML = t('sstv.table.header');
  }

  window._midiRefreshLang = refreshLangUI;

  // Event listeners
  editor.addEventListener('input', function() { parseEditor(); });
  editor.addEventListener('scroll', function() {
    gutter.scrollTop = editor.scrollTop;
    highlightOverlay.scrollTop = editor.scrollTop;
  });
  editor.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); window.midiExportFile(); }
    if (e.key === 'Tab') {
      e.preventDefault();
      var start = editor.selectionStart, end = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 2;
      parseEditor();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === ' ' && document.activeElement !== editor) {
      e.preventDefault(); togglePlay();
    }
    if (e.key === 'Escape' && isPlaying) {
      e.preventDefault(); stopPlayback();
    }
  });

  function resizeHandler() {
    updateHighlightOverlay();
    if (isPlaying) highlightLine(currentNoteIndex);
  }
  window.addEventListener('resize', resizeHandler);
  window._midiResizeHandler = resizeHandler;

  // ── 可拖动分隔条：调整编辑器/侧边栏宽度 ──
  (function() {
    var handle = document.getElementById('resizeHandle');
    var mainContainer = document.querySelector('.main-container');
    var sidebar = document.querySelector('.sidebar');
    if (!handle || !mainContainer || !sidebar) return;

    var isDragging = false;
    var startX = 0;
    var startWidth = 0;

    handle.addEventListener('mousedown', function(e) {
      isDragging = true;
      startX = e.clientX;
      startWidth = sidebar.offsetWidth;
      handle.classList.add('active');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      var dx = startX - e.clientX;
      var newWidth = startWidth + dx;
      newWidth = Math.max(180, Math.min(500, newWidth));
      sidebar.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', function() {
      if (!isDragging) return;
      isDragging = false;
      handle.classList.remove('active');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      // Trigger editor resize update
      if (window._midiResizeHandler) window._midiResizeHandler();
    });
  })();

  window.addEventListener('beforeunload', function() {
    stopPlayback();
    if (audioCtx) audioCtx.close();
  });

  // Restore saved content
  var saved = localStorage.getItem('midi-tools-editor-content');
  if (saved) { editor.value = saved; }
  else { window.midiLoadExample('scale'); }

  var saveTimeout;
  editor.addEventListener('input', function() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(function() {
      localStorage.setItem('midi-tools-editor-content', editor.value);
    }, 500);
  });

  parseEditor();
  updateHighlightOverlay();

  // Expose to global
  window.midiTogglePlay = togglePlay;
  window.midiToggleLoop = toggleLoop;
  window.midiStop = stopPlayback;

  window.midiEditor = {
    getParsedNotes: function() { parseEditor(); return parsedNotes; },
    getBPM: function() { return bpm; },
    getSpeedMultiplier: function() { return speedMultiplier; },
    getBaseFreq: function() { return baseFreq; },
    getWaveform: function() { return waveform; },
    getMasterVolume: function() { return masterVolume; }
  };
})();