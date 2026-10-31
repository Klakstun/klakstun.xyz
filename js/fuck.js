// ── 主题配色系统（与 MIDI 子页共享 localStorage） ──
  var themes = {
    default: {
      dark:  {accent:'#c4b0f7',accent2:'#f2b5cc',accentOn:'#2a1b4d',accent2On:'#4d1d2e',accentSoft:'#3d3260',accent2Soft:'#543843',accentSoftText:'#d7ccff',accent2SoftText:'#ffd6e2'},
      light: {accent:'#6b52c4',accent2:'#c94e6e',accentOn:'#ffffff',accent2On:'#ffffff',accentSoft:'#e8e3ff',accent2Soft:'#ffe8f0',accentSoftText:'#3d2866',accent2SoftText:'#5c1a30'}
    },
    ocean: {
      dark:  {accent:'#b3d4ff',accent2:'#7dd3c0',accentOn:'#003258',accent2On:'#00382c',accentSoft:'#234564',accent2Soft:'#234a44',accentSoftText:'#d4e4ff',accent2SoftText:'#a0f0dc'},
      light: {accent:'#3a6fb5',accent2:'#2d8a70',accentOn:'#ffffff',accent2On:'#ffffff',accentSoft:'#d4e8ff',accent2Soft:'#d4f4ec',accentSoftText:'#1a3a5c',accent2SoftText:'#1a3a30'}
    },
    forest: {
      dark:  {accent:'#b8f0b8',accent2:'#ffd470',accentOn:'#002108',accent2On:'#261900',accentSoft:'#1e3a22',accent2Soft:'#3d3420',accentSoftText:'#d4ffd4',accent2SoftText:'#ffe08a'},
      light: {accent:'#3d8a3d',accent2:'#b88820',accentOn:'#ffffff',accent2On:'#ffffff',accentSoft:'#d4f4d4',accent2Soft:'#fff4d4',accentSoftText:'#1a3a1a',accent2SoftText:'#3d2a10'}
    },
    sunset: {
      dark:  {accent:'#ffb4a2',accent2:'#ffd470',accentOn:'#561e0d',accent2On:'#261900',accentSoft:'#4a2c20',accent2Soft:'#3d3420',accentSoftText:'#ffdbd4',accent2SoftText:'#ffe08a'},
      light: {accent:'#c9604a',accent2:'#b88820',accentOn:'#ffffff',accent2On:'#ffffff',accentSoft:'#ffe8e0',accent2Soft:'#fff4d4',accentSoftText:'#4a1a10',accent2SoftText:'#3d2a10'}
    },
    lavender: {
      dark:  {accent:'#e5c4ff',accent2:'#b8d4ff',accentOn:'#3d1f6e',accent2On:'#002a4a',accentSoft:'#453560',accent2Soft:'#243a54',accentSoftText:'#f2ddff',accent2SoftText:'#d4e4ff'},
      light: {accent:'#7b52b5',accent2:'#4a7fbf',accentOn:'#ffffff',accent2On:'#ffffff',accentSoft:'#f0e4ff',accent2Soft:'#e0ecff',accentSoftText:'#3a2060',accent2SoftText:'#1a3050'}
    },
    cherry: {
      dark:  {accent:'#ffc0cb',accent2:'#ffb4a2',accentOn:'#581a26',accent2On:'#561e0d',accentSoft:'#52303a',accent2Soft:'#4a2c20',accentSoftText:'#ffd9e0',accent2SoftText:'#ffdbd4'},
      light: {accent:'#c95a6a',accent2:'#c9604a',accentOn:'#ffffff',accent2On:'#ffffff',accentSoft:'#ffe0e8',accent2Soft:'#ffe8e0',accentSoftText:'#4a1a28',accent2SoftText:'#4a1a10'}
    }
  };
  window.applyTheme = function(name) {
    var t = themes[name] || themes['default'];
    var isLight = document.body.classList.contains('light-mode');
    var c = isLight ? (t.light || t.dark) : t.dark;
    var root = document.documentElement;
    root.style.setProperty('--accent', c.accent);
    root.style.setProperty('--accent-on', c.accentOn);
    root.style.setProperty('--accent-soft', c.accentSoft);
    root.style.setProperty('--accent-soft-text', c.accentSoftText);
    root.style.setProperty('--accent2', c.accent2);
    root.style.setProperty('--accent2-on', c.accent2On);
    root.style.setProperty('--accent2-soft', c.accent2Soft);
    root.style.setProperty('--accent2-soft-text', c.accent2SoftText);
    localStorage.setItem('midi-theme', name);
    var popup = document.getElementById('themePopup');
    if (popup) popup.classList.remove('show');
    var swatches = document.querySelectorAll('.theme-swatch');
    for (var i = 0; i < swatches.length; i++) {
      swatches[i].classList.toggle('active', swatches[i].getAttribute('data-theme') === name);
    }
  };
  window.toggleThemePopup = function() {
    var popup = document.getElementById('themePopup');
    if (popup) popup.classList.toggle('show');
  };
  document.addEventListener('click', function(e) {
    var popup = document.getElementById('themePopup');
    var btn = document.getElementById('themeBtn');
    if (popup && btn && popup.classList.contains('show') && !popup.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      popup.classList.remove('show');
    }
  });
  // ── 深浅模式切换（扩散过渡） ──
  window.toggleColorMode = function(e) {
    var body = document.body;
    var isLight = body.classList.contains('light-mode');
    var x = e ? e.clientX : window.innerWidth / 2;
    var y = e ? e.clientY : window.innerHeight / 2;
    var doToggle = function() {
      if (isLight) {
        body.classList.remove('light-mode');
        localStorage.setItem('midi-color-mode', 'dark');
      } else {
        body.classList.add('light-mode');
        localStorage.setItem('midi-color-mode', 'light');
      }
      updateModeIcon();
      var savedTheme = localStorage.getItem('midi-theme') || 'default';
      window.applyTheme(savedTheme);
    };
    if (!document.startViewTransition) { doToggle(); return; }

    document.documentElement.style.setProperty('--vt-x', x + 'px');
    document.documentElement.style.setProperty('--vt-y', y + 'px');
    document.startViewTransition(function() { doToggle(); });
  };
  function updateModeIcon() {
    var icon = document.getElementById('modeIcon');
    if (!icon) return;
    var isLight = document.body.classList.contains('light-mode');
    icon.innerHTML = isLight
      ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
      : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  }
  // 初始化
  var savedMode = localStorage.getItem('midi-color-mode');
  if (savedMode === 'light') document.body.classList.add('light-mode');
  updateModeIcon();
  var savedTheme = localStorage.getItem('midi-theme') || 'default';
  window.applyTheme(savedTheme);