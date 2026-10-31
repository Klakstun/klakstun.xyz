/* ═══════════════════════════════════════════
   SSTV Robot72 文本转音频 — 核心逻辑
   ═══════════════════════════════════════════ */
(function() {
  'use strict';

  var textInput = document.getElementById('sstvTextInput');
  var btnPlay = document.getElementById('sstvBtnPlay');
  var btnStop = document.getElementById('sstvBtnStop');
  var btnExport = document.getElementById('sstvBtnExport');
  var hexContent = document.getElementById('sstvHexContent');
  var hexPreview = document.getElementById('sstvHexPreview');
  var freqTable = document.getElementById('sstvFreqTable');
  var freqTableBody = document.getElementById('sstvFreqTableBody');

  var audioCtx = null;
  var isPlaying = false;
  var charDuration = 100;
  var masterVolume = 0.8;
  var scheduledNodes = [];
  var toastTimer = null;

  var FREQ_BLACK = 1500;
  var FREQ_WHITE = 2300;

  function hexToFreq(hexVal) {
    return FREQ_BLACK + (hexVal / 255) * (FREQ_WHITE - FREQ_BLACK);
  }

  function textToHexBytes(text) {
    if (!text) return [];
    var bytes = [];
    for (var i = 0; i < text.length; i += 2) {
      var pair = text.substring(i, i + 2);
      var val = 0;
      if (pair.length === 2) {
        val = ((pair.charCodeAt(0) * 256 + pair.charCodeAt(1)) & 0xFF) || pair.charCodeAt(0) & 0xFF;
      }
      bytes.push({ chars: pair, hex: val, freq: hexToFreq(val) });
    }
    return bytes;
  }

  function getAudioContext() {
    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function scheduleTone(freq, startTime, duration) {
    var ctx = getAudioContext();
    var osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    var gain = ctx.createGain();
    var vol = masterVolume;
    var attackTime = Math.min(0.005, duration * 0.1);
    var releaseTime = Math.min(0.01, duration * 0.15);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + attackTime);
    gain.gain.setValueAtTime(vol, startTime + duration - releaseTime);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.01);

    return { osc: osc, gain: gain };
  }

  function play() {
    var text = textInput.value.trim();
    if (!text) { showToast(window._t('toast.enterText')); return; }

    stopAllNodes();

    var bytes = textToHexBytes(text);
    if (bytes.length === 0) { showToast(window._t('toast.cannotEncode')); return; }

    updateHexPreview(bytes);

    var ctx = getAudioContext();
    isPlaying = true;
    btnPlay.innerHTML = window._t('sstv.pause');
    btnPlay.classList.add('accent2'); btnPlay.classList.remove('primary');
    btnStop.disabled = false;
    btnExport.disabled = true;

    var now = ctx.currentTime;
    var durSec = charDuration / 1000;
    scheduledNodes = [];

    for (var i = 0; i < bytes.length; i++) {
      var t = now + i * durSec;
      var node = scheduleTone(bytes[i].freq, t, durSec);
      node._index = i;
      scheduledNodes.push(node);
    }

    var totalDuration = bytes.length * durSec;
    scheduledNodes._endTimeout = setTimeout(function() {
      stopPlayback();
    }, totalDuration * 1000 + 200);
  }

  function stopAllNodes() {
    for (var i = 0; i < scheduledNodes.length; i++) {
      try { scheduledNodes[i].osc.stop(); } catch(e) {}
      try { scheduledNodes[i].gain.gain.cancelScheduledValues(0); } catch(e) {}
    }
    if (scheduledNodes._endTimeout) clearTimeout(scheduledNodes._endTimeout);
    scheduledNodes = [];
  }

  function stopPlayback() {
    isPlaying = false;
    stopAllNodes();
    btnPlay.innerHTML = window._t('sstv.play');
    btnPlay.classList.add('primary'); btnPlay.classList.remove('accent2');
    btnStop.disabled = true;
    btnExport.disabled = false;
  }

  function togglePlay() {
    if (isPlaying) stopPlayback();
    else play();
  }

  function updateDuration(val) {
    charDuration = Math.max(20, Math.min(500, parseInt(val) || 100));
    document.getElementById('sstvDurationSlider').value = charDuration;
    document.getElementById('sstvDurationInput').value = charDuration;
    document.getElementById('sstvDurationVal').textContent = charDuration + ' ms';
  }

  function updateVolume(val) {
    masterVolume = parseInt(val) / 100;
    document.getElementById('sstvVolSlider').value = val;
    document.getElementById('sstvVolVal').textContent = val + '%';
  }

  function updateHexPreview(bytes) {
    if (!bytes || bytes.length === 0) {
      hexPreview.classList.remove('show');
      freqTable.classList.remove('show');
      return;
    }
    hexPreview.classList.add('show');
    freqTable.classList.add('show');

    var hexStr = '';
    var tableRows = '';
    for (var i = 0; i < bytes.length; i++) {
      var h = bytes[i].hex.toString(16).toUpperCase().padStart(2, '0');
      hexStr += h + ' ';
      tableRows += '<tr><td>' + (i + 1) + '</td><td><code>' + escapeHtml(bytes[i].chars) + '</code></td><td><code>' + h + '</code></td><td class="freq-val">' + bytes[i].freq.toFixed(1) + ' Hz</td></tr>';
    }
    hexContent.textContent = hexStr.trim();
    freqTableBody.innerHTML = tableRows;
  }

  function refreshHex() {
    var text = textInput.value;
    var bytes = textToHexBytes(text);
    updateHexPreview(bytes);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function encodeWAV(samples, sampleRate) {
    var numChannels = 1;
    var bitsPerSample = 16;
    var bytesPerSample = bitsPerSample / 8;
    var blockAlign = numChannels * bytesPerSample;
    var byteRate = sampleRate * blockAlign;
    var dataSize = samples.length * bytesPerSample;
    var buf = new ArrayBuffer(44 + dataSize);
    var view = new DataView(buf);

    function w(s, o) { for (var i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); }
    w('RIFF', 0); view.setUint32(4, 36 + dataSize, true);
    w('WAVE', 8); w('fmt ', 12);
    view.setUint32(16, 16, true); view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true); view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true); view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true); w('data', 36);
    view.setUint32(40, dataSize, true);

    for (var i = 0; i < samples.length; i++) {
      var s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return buf;
  }

  function exportWAV() {
    var text = textInput.value.trim();
    if (!text) { showToast(window._t('toast.enterText')); return; }

    var bytes = textToHexBytes(text);
    if (bytes.length === 0) { showToast(window._t('toast.cannotEncode')); return; }

    var sampleRate = 44100;
    var durSec = charDuration / 1000;
    var totalSamples = Math.ceil(bytes.length * durSec * sampleRate) + Math.ceil(0.05 * sampleRate);
    var offlineCtx = new OfflineAudioContext(1, totalSamples, sampleRate);

    for (var i = 0; i < bytes.length; i++) {
      var t = i * durSec;
      var osc = offlineCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(bytes[i].freq, t);

      var gain = offlineCtx.createGain();
      var vol = masterVolume;
      var attack = Math.min(0.005, durSec * 0.1);
      var release = Math.min(0.01, durSec * 0.15);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + attack);
      gain.gain.setValueAtTime(vol, t + durSec - release);
      gain.gain.linearRampToValueAtTime(0, t + durSec);

      osc.connect(gain);
      gain.connect(offlineCtx.destination);
      osc.start(t);
      osc.stop(t + durSec + 0.01);
    }

    showToast(window._t('toast.generatingWAV'));
    offlineCtx.startRendering().then(function(rendered) {
      var wavBuf = encodeWAV(rendered.getChannelData(0), sampleRate);
      var blob = new Blob([wavBuf], { type: 'audio/wav' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'sstv-text-' + new Date().toISOString().slice(0, 10) + '.wav';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(window._t('toast.wavExported2') + bytes.length + ' bytes, ' + (bytes.length * durSec).toFixed(1) + 's)');
    }).catch(function(e) {
      showToast(window._t('toast.wavFailed') + e.message);
      console.error(e);
    });
  }

  function showToast(msg) {
    var toast = document.getElementById('toast');
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(function() { toast.classList.remove('show'); toastTimer = null; }, 2000);
  }

  // Events
  textInput.addEventListener('input', function() { refreshHex(); });

  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('tab-sstv').classList.contains('active')) return;
    if (e.key === ' ' && document.activeElement !== textInput) {
      e.preventDefault(); togglePlay();
    }
    if (e.key === 'Escape' && isPlaying) {
      e.preventDefault(); stopPlayback();
    }
  });

  // Expose to global
  window.sstvUpdateDuration = updateDuration;
  window.sstvUpdateVolume = updateVolume;
  window.sstvTogglePlay = togglePlay;
  window.sstvStopPlayback = stopPlayback;
  window.sstvRefreshHex = refreshHex;
  window.sstvExportWAV = exportWAV;

  // Init
  refreshHex();
})();