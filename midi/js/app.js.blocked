/* ═══════════════════════════════════════════
   i18n 国际化系统
   ═══════════════════════════════════════════ */
(function() {
  'use strict';

  var I18N = {
    zh: {
      'app.title': '工具集',
      'tab.midi': '🎵 MIDI编辑器',
      'tab.audio': '🔊 音频导出',
      'tab.sstv': '📝 文本转音频',

      'btn.play': '▶ 播放',
      'btn.pause': '⏸ 暂停',
      'btn.resume': '▶ 继续',
      'btn.stop': '⏹ 停止',
      'label.bpm': 'BPM',
      'label.baseFreq': '基准频率',
      'label.volume': '音量',
      'label.waveform': '波形',
      'waveform.triangle': '三角波',
      'waveform.sine': '正弦波',
      'waveform.square': '方波',
      'waveform.sawtooth': '锯齿波',
      'btn.scale': '纯律音阶',
      'btn.melody': '旋律示例',
      'btn.chords': '和弦示例',
      'btn.import': '📂 导入',
      'btn.export': '💾 导出',
      'btn.clear': '清空',

      'editor.placeholder': '在此输入 MIDI 文本，格式：\n时值,音高,大小,编号\n\n例如：\n1/1,1/1,10,01\n1/1,9/8,10,02\n1/1,5/4,10,03\n1/1,4/3,10,04',

      'sidebar.speed': '速度调节',
      'sidebar.speedRate': '倍率',
      'sidebar.speedBPM': '有效 BPM: ',
      'sidebar.noteInfo': '当前音符信息',
      'sidebar.format': '格式说明',
      'sidebar.shortcuts': '快捷键',

      'info.labelLine': '行号',
      'info.labelDurFrac': '时值(分数)',
      'info.labelDuration': '时值(拍)',
      'info.labelPitchFrac': '音高(分数)',
      'info.labelPitchSimple': '音高(简化)',
      'info.labelFreq': '频率',
      'info.labelSize': '大小(01-10)',
      'info.labelId': '编号',

      'info.line': ' 行',
      'info.lineChord': ' [和弦]',
      'info.notes': ' 个音符',
      'info.chord': '和弦',
      'info.beats': ' 拍',
      'info.velocity': '力度:',
      'info.vel': '力度:',

      'status.ready': '就绪',
      'status.playing': '演奏中...',
      'status.paused': '已暂停',
      'status.notes': '音符: ',
      'status.total': '总时长: ',
      'status.errors': '错误: ',
      'status.beats': '拍',

      'audio.title': '音频导出工具',
      'audio.subtitle': '将编辑器中的音符导出为 WAV 音频或 MIDI 文件',
      'audio.statNotes': '音符数',
      'audio.statBeats': '总时长(拍)',
      'audio.statBPM': '有效 BPM',
      'audio.statDuration': '预计时长',
      'audio.exportWAV': '🔊 导出 WAV',
      'audio.exportMIDI': '🎹 导出 MIDI',
      'audio.refresh': '🔄 刷新',
      'audio.sampleRate': '采样率',
      'audio.bitDepth': '位深度',
      'audio.midiNoteLen': 'MIDI 音符时长',
      'audio.midiNoteLen.actual': '实际时值',
      'audio.midiNoteLen.fixed': '固定(八分音符)',
      'audio.preview': '音符预览',
      'audio.previewNotes': ' 个音符',

      'sstv.label': '输入文本',
      'sstv.placeholder': '在此输入要转换的文本...\n每两个字符会被编码为一个十六进制字节，映射到 SSTV Robot72 频率范围\n例如: Hello World',
      'sstv.charDuration': '字符时长',
      'sstv.volume': '音量',
      'sstv.play': '▶ 播放',
      'sstv.pause': '⏸ 暂停',
      'sstv.stop': '⏹ 停止',
      'sstv.export': '🔊 导出 WAV',
      'sstv.refresh': '🔄 刷新编码',
      'sstv.hexPreview': '十六进制编码预览',
      'sstv.info': '<strong>SSTV Robot72 Color 频率映射</strong><br>文本字符 → ASCII/Unicode 编码 → 十六进制 <code>00</code>~<code>FF</code> → 映射到 SSTV 亮度频率范围 <code>1500 Hz</code> (黑) ~ <code>2300 Hz</code> (白)<br>频率计算公式: <code>freq = 1500 + (hexVal / 255) × 800</code>',

      'toast.noNotes': '没有可播放的音符',
      'toast.exampleLoaded': '示例已加载',
      'toast.fileImported': '文件已导入: ',
      'toast.fileExported': '文件已导出',
      'toast.noExportNotes': '没有可导出的音符，请先在 MIDI 编辑器中输入音符',
      'toast.generatingWAV': '正在生成 WAV...',
      'toast.wavExported': 'WAV 已导出',
      'toast.wavFailed': 'WAV 导出失败: ',
      'toast.midiExported': 'MIDI 已导出',
      'toast.enterText': '请输入文本',
      'toast.cannotEncode': '无法编码文本',
      'toast.generatingWAV2': '正在生成 WAV (',
      'toast.wavExported2': 'WAV 已导出 (',

      'error.format': '格式错误：至少需要时值和音高',
      'error.durFormat': '时值格式错误：需为 分子/分母（如 1/1, 1/8）',
      'error.pitchFormat': '音高格式错误：需为 分子/分母（如 1/1, 4/3, 3/2）',
      'error.sizeFormat': '大小格式错误：需为两位数 01~10',
      'error.idFormat': '编号格式错误：需为两位数 00~99',
      'error.nestedChord': '不支持嵌套和弦：在已有和弦块内遇到了新的 {',
      'error.unmatchedEnd': '未匹配的和弦结束符：没有对应的 {',
      'error.emptyChord': '空和弦块（没有音符）',
      'error.unclosedChord': '和弦块未闭合：缺少 }',

      'export.chord': ' [和弦]  ',
      'export.notes': ' 音符, 最长 ',
      'export.beats': ' 拍',
      'export.notes2': ' 音符',
      'export.notesCount': ' 音符, ',
      'export.notesCount2': ' 音符, ',
      'export.bpm': ' BPM)',
      'export.s': 's)',
      'export.notesParen': ' 音符)...',
      'export.notesDone': ' 音符, ',
      'export.done': 's)',

      'format.help.line1': '每行一个音符，逗号分隔四个字段：',
      'format.help.line2': ' 分数格式，默认 ',
      'format.help.line3': '=四分音符 ',
      'format.help.line4': '=八分音符 ',
      'format.help.line5': '=三十二分音符',
      'format.help.line6': ' 纯分数频率比，不限定律制',
      'format.help.line7': '=基准 ',
      'format.help.line8': '=纯四度 ',
      'format.help.line9': '=纯五度 ',
      'format.help.line10': '=大三度',
      'format.help.line11': '，默认 ',
      'format.help.line12': ' 两位数 ',
      'format.help.line13': '，默认为空',
      'format.help.line14': '从上到下依次演奏',
      'format.help.chord': '和弦语法：',
      'format.help.chord2': ' 和 ',
      'format.help.chord3': ' 各自独占一行，块内音符同时演奏',
      'format.help.freq': '基准频率：',
      'format.help.freq2': ' 独占一行，影响后续所有音符',

      'shortcut.space': ' 播放/暂停',
      'shortcut.escape': ' 停止',
      'shortcut.ctrlS': ' 导出文件',

      'sstv.table.header': '<tr><th>#</th><th>字符</th><th>Hex</th><th>频率 (Hz)</th></tr>',
      'sstv.table.headerEn': '<tr><th>#</th><th>Char</th><th>Hex</th><th>Freq (Hz)</th></tr>',

      'footer.source': '源代码',
      'footer.advanced': '高级参数',
      'about.source': '源代码',
      'about.sourceLink': 'GitHub',

      'advanced.title': '高级参数',
      'advanced.attack': 'Attack (秒)',
      'advanced.release': 'Release (秒)',
      'advanced.sustainLevel': 'Sustain Level',
      'advanced.harmonic': '泛音音量',
      'advanced.fadeOut': '淡出比例',
      'advanced.reset': '恢复默认',

      'left.nav': '功能',
      'sidebar.info': '音符信息',
      'sidebar.tutorial': '教程',
      'sidebar.about': '作品信息',
      'sidebar.examples': '示例',
      'about.project': '项目信息',
      'about.name': '项目名称',
      'about.version': '版本',
      'about.license': '许可',
      'about.repo': '仓库',
      'about.author': '作者',
      'about.authorName': '作者',
      'about.credit': '署名',
      'about.contact': '联系方式',
      'about.desc': '描述',
      'about.thanks': '致谢',
      'about.advanced': '高级参数',

      'scale.comment': '// 纯律自然大调音阶 (Just Intonation)',
      'melody.comment': '// 小星星 (纯律)',
      'chords.comment': '// 和弦示例：使用 { } 语法，大括号各自独占一行\n// 块内音符同时演奏，和弦时长取最长音符\n// 大三和弦\n{\n1/1,1/1,10,01\n1/1,5/4,09,02\n1/1,3/2,08,03\n}\n// 小三和弦\n{\n1/1,1/1,10,04\n1/1,6/5,09,05\n1/1,3/2,08,06\n}\n// 属七和弦\n{\n1/1,1/1,10,07\n1/1,5/4,09,08\n1/1,3/2,08,09\n1/1,7/4,07,10\n}\n// 柱式和弦（长音）\n{\n3/1,1/1,10,11\n3/1,5/4,09,12\n3/1,3/2,08,13\n3/1,2/1,07,14\n}'
    },
    en: {
      'app.title': 'Tools',
      'tab.midi': '🎵 MIDI Editor',
      'tab.audio': '🔊 Audio Export',
      'tab.sstv': '📝 Text to Audio',

      'btn.play': '▶ Play',
      'btn.pause': '⏸ Pause',
      'btn.resume': '▶ Resume',
      'btn.stop': '⏹ Stop',
      'label.bpm': 'BPM',
      'label.baseFreq': 'Base Freq',
      'label.volume': 'Volume',
      'label.waveform': 'Waveform',
      'waveform.triangle': 'Triangle',
      'waveform.sine': 'Sine',
      'waveform.square': 'Square',
      'waveform.sawtooth': 'Sawtooth',
      'btn.scale': 'Just Scale',
      'btn.melody': 'Melody',
      'btn.chords': 'Chords',
      'btn.import': '📂 Import',
      'btn.export': '💾 Export',
      'btn.clear': 'Clear',

      'editor.placeholder': 'Enter MIDI text here. Format:\nDuration,Pitch,Size,ID\n\nExample:\n1/1,1/1,10,01\n1/1,9/8,10,02\n1/1,5/4,10,03\n1/1,4/3,10,04',

      'sidebar.speed': 'Speed Control',
      'sidebar.speedRate': 'Rate',
      'sidebar.speedBPM': 'Effective BPM: ',
      'sidebar.noteInfo': 'Current Note Info',
      'sidebar.format': 'Format Help',
      'sidebar.shortcuts': 'Shortcuts',

      'info.labelLine': 'Line',
      'info.labelDurFrac': 'Duration (frac)',
      'info.labelDuration': 'Duration (beats)',
      'info.labelPitchFrac': 'Pitch (frac)',
      'info.labelPitchSimple': 'Pitch (simple)',
      'info.labelFreq': 'Frequency',
      'info.labelSize': 'Size (01-10)',
      'info.labelId': 'ID',

      'info.line': ' line',
      'info.lineChord': ' [Chord]',
      'info.notes': ' notes',
      'info.chord': 'Chord',
      'info.beats': ' beats',
      'info.velocity': 'vel:',
      'info.vel': 'vel:',

      'status.ready': 'Ready',
      'status.playing': 'Playing...',
      'status.paused': 'Paused',
      'status.notes': 'Notes: ',
      'status.total': 'Total: ',
      'status.errors': 'Errors: ',
      'status.beats': 'beats',

      'audio.title': 'Audio Export Tool',
      'audio.subtitle': 'Export notes from the editor as WAV audio or MIDI files',
      'audio.statNotes': 'Notes',
      'audio.statBeats': 'Total (beats)',
      'audio.statBPM': 'Effective BPM',
      'audio.statDuration': 'Est. Duration',
      'audio.exportWAV': '🔊 Export WAV',
      'audio.exportMIDI': '🎹 Export MIDI',
      'audio.refresh': '🔄 Refresh',
      'audio.sampleRate': 'Sample Rate',
      'audio.bitDepth': 'Bit Depth',
      'audio.midiNoteLen': 'MIDI Note Len',
      'audio.midiNoteLen.actual': 'Actual',
      'audio.midiNoteLen.fixed': 'Fixed (8th note)',
      'audio.preview': 'Note Preview',
      'audio.previewNotes': ' notes',

      'sstv.label': 'Enter Text',
      'sstv.placeholder': 'Enter text to convert...\nEach two characters are encoded as one hex byte, mapped to SSTV Robot72 frequency range\nExample: Hello World',
      'sstv.charDuration': 'Char Duration',
      'sstv.volume': 'Volume',
      'sstv.play': '▶ Play',
      'sstv.pause': '⏸ Pause',
      'sstv.stop': '⏹ Stop',
      'sstv.export': '🔊 Export WAV',
      'sstv.refresh': '🔄 Refresh',
      'sstv.hexPreview': 'Hex Encoding Preview',
      'sstv.info': '<strong>SSTV Robot72 Color Frequency Mapping</strong><br>Text chars → ASCII/Unicode → Hex <code>00</code>~<code>FF</code> → mapped to SSTV luminance frequency range <code>1500 Hz</code> (black) ~ <code>2300 Hz</code> (white)<br>Frequency formula: <code>freq = 1500 + (hexVal / 255) × 800</code>',

      'toast.noNotes': 'No notes to play',
      'toast.exampleLoaded': 'Example loaded',
      'toast.fileImported': 'File imported: ',
      'toast.fileExported': 'File exported',
      'toast.noExportNotes': 'No notes to export. Please enter notes in the MIDI editor first.',
      'toast.generatingWAV': 'Generating WAV...',
      'toast.wavExported': 'WAV exported',
      'toast.wavFailed': 'WAV export failed: ',
      'toast.midiExported': 'MIDI exported',
      'toast.enterText': 'Please enter text',
      'toast.cannotEncode': 'Cannot encode text',
      'toast.generatingWAV2': 'Generating WAV (',
      'toast.wavExported2': 'WAV exported (',

      'error.format': 'Format error: at least duration and pitch required',
      'error.durFormat': 'Duration format error: must be numerator/denominator (e.g. 1/1, 1/8)',
      'error.pitchFormat': 'Pitch format error: must be numerator/denominator (e.g. 1/1, 4/3, 3/2)',
      'error.sizeFormat': 'Size format error: must be two digits 01~10',
      'error.idFormat': 'ID format error: must be two digits 00~99',
      'error.nestedChord': 'Nested chords not supported: encountered new { inside an existing chord block',
      'error.unmatchedEnd': 'Unmatched chord end: no corresponding {',
      'error.emptyChord': 'Empty chord block (no notes)',
      'error.unclosedChord': 'Unclosed chord block: missing }',

      'export.chord': ' [Chord]  ',
      'export.notes': ' notes, max ',
      'export.beats': ' beats',
      'export.notes2': ' notes',
      'export.notesCount': ' notes, ',
      'export.notesCount2': ' notes, ',
      'export.bpm': ' BPM)',
      'export.s': 's)',
      'export.notesParen': ' notes)...',
      'export.notesDone': ' notes, ',
      'export.done': 's)',

      'format.help.line1': 'One note per line, four comma-separated fields:',
      'format.help.line2': ' fraction format, default ',
      'format.help.line3': '=quarter note ',
      'format.help.line4': '=eighth note ',
      'format.help.line5': '=32nd note',
      'format.help.line6': ' pure ratio frequency, any tuning system',
      'format.help.line7': '=unison ',
      'format.help.line8': '=perfect fourth ',
      'format.help.line9': '=perfect fifth ',
      'format.help.line10': '=major third',
      'format.help.line11': ', default ',
      'format.help.line12': ' two digits ',
      'format.help.line13': ', default empty',
      'format.help.line14': 'Played top to bottom',
      'format.help.chord': 'Chord syntax: ',
      'format.help.chord2': ' and ',
      'format.help.chord3': ' each on its own line, inner notes play simultaneously',
      'format.help.freq': 'Base frequency: ',
      'format.help.freq2': ' on its own line, affects all subsequent notes',

      'shortcut.space': ' Play/Pause',
      'shortcut.escape': ' Stop',
      'shortcut.ctrlS': ' Export file',

      'sstv.table.header': '<tr><th>#</th><th>Char</th><th>Hex</th><th>Freq (Hz)</th></tr>',
      'sstv.table.headerEn': '<tr><th>#</th><th>Char</th><th>Hex</th><th>Freq (Hz)</th></tr>',

      'footer.source': 'Source Code',
      'footer.advanced': 'Advanced',
      'about.source': 'Source',
      'about.sourceLink': 'GitHub',

      'advanced.title': 'Advanced Parameters',
      'advanced.attack': 'Attack (s)',
      'advanced.release': 'Release (s)',
      'advanced.sustainLevel': 'Sustain Level',
      'advanced.harmonic': 'Harmonic Vol',
      'advanced.fadeOut': 'Fade Out Ratio',
      'advanced.reset': 'Reset Defaults',

      'left.nav': 'Menu',
      'sidebar.info': 'Note Info',
      'sidebar.tutorial': 'Tutorial',
      'sidebar.about': 'About',
      'sidebar.examples': 'Examples',
      'about.project': 'Project',
      'about.name': 'Name',
      'about.version': 'Version',
      'about.license': 'License',
      'about.repo': 'Repository',
      'about.author': 'Author',
      'about.authorName': 'Author',
      'about.credit': 'Credit',
      'about.contact': 'Contact',
      'about.desc': 'Description',
      'about.thanks': 'Thanks',
      'about.advanced': 'Advanced',

      'scale.comment': '// Just Intonation Major Scale',
      'melody.comment': '// Twinkle Twinkle Little Star (Just Intonation)',
      'chords.comment': '// Chord examples: use { } syntax, each brace on its own line\n// Inner notes play simultaneously, chord duration = longest note\n// Major triad\n{\n1/1,1/1,10,01\n1/1,5/4,09,02\n1/1,3/2,08,03\n}\n// Minor triad\n{\n1/1,1/1,10,04\n1/1,6/5,09,05\n1/1,3/2,08,06\n}\n// Dominant seventh\n{\n1/1,1/1,10,07\n1/1,5/4,09,08\n1/1,3/2,08,09\n1/1,7/4,07,10\n}\n// Block chords (long notes)\n{\n3/1,1/1,10,11\n3/1,5/4,09,12\n3/1,3/2,08,13\n3/1,2/1,07,14\n}'
    }
  };

  var currentLang = 'en';

  window._t = function(key) {
    var dict = I18N[currentLang];
    return dict[key] !== undefined ? dict[key] : key;
  };

  window.setLanguage = function(lang) {
    currentLang = lang;
    localStorage.setItem('midi-tools-lang', lang);

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var val = I18N[lang][key];
      if (val !== undefined) el.textContent = val;
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = I18N[lang][key];
      if (val !== undefined) el.placeholder = val;
    });

    // Update innerHTML elements
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      var val = I18N[lang][key];
      if (val !== undefined) el.innerHTML = val.replace(/\n/g, '<br>');
    });

    // Update document title
    document.title = 'MIDI ' + I18N[lang]['app.title'];

    // Refresh dynamic UI text
    if (window._midiRefreshLang) window._midiRefreshLang();
  };

  // Load saved language preference
  var savedLang = localStorage.getItem('midi-tools-lang');
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    currentLang = savedLang;
  }
})();

/* ═══════════════════════════════════════════
   标签切换 & 左侧栏 & 右侧栏
   ═══════════════════════════════════════════ */
(function() {
  'use strict';
  var body = document.body;

  // ── 左侧栏切换 ──
  window.toggleLeftSidebar = function() {
    var sidebar = document.getElementById('leftSidebar');
    var toggle = document.getElementById('sidebarToggle');
    if (sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      toggle.classList.remove('active');
    } else {
      sidebar.classList.add('open');
      toggle.classList.add('active');
    }
  };

  // ── 主标签切换（MIDI / 音频导出 / SSTV） ──
  window.switchMainTab = function(tab) {
    // 更新左侧栏高亮
    var navItems = document.querySelectorAll('.left-nav-item');
    navItems.forEach(function(item) { item.classList.remove('active'); });
    var activeItem = document.querySelector('.left-nav-item[data-tab="' + tab + '"]');
    if (activeItem) activeItem.classList.add('active');

    // 切换标签内容
    var tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(function(c) { c.classList.remove('active'); });
    var target = document.getElementById('tab-' + tab);
    if (target) target.classList.add('active');

    if (tab === 'midi') {
      body.classList.remove('dir-mode');
      if (window._midiResizeHandler) window._midiResizeHandler();
    } else if (tab === 'sstv') {
      body.classList.add('dir-mode');
      if (window.midiStop) window.midiStop();
      if (window.sstvRefreshHex) window.sstvRefreshHex();
    } else {
      body.classList.add('dir-mode');
      if (window.midiStop) window.midiStop();
      if (window.audioExportRefresh) window.audioExportRefresh();
    }
  };

  // ── 右侧栏标签切换（音符信息 / 教程 / 作品信息） ──
  window.switchSidebarTab = function(tab) {
    var sidebarTabs = document.querySelectorAll('.sidebar-tab');
    sidebarTabs.forEach(function(t) { t.classList.remove('active'); });
    var activeTab = document.querySelector('.sidebar-tab[data-sidebar-tab="' + tab + '"]');
    if (activeTab) activeTab.classList.add('active');

    var panels = document.querySelectorAll('.sidebar-panel');
    panels.forEach(function(p) { p.classList.remove('active'); });
    var panel = document.getElementById('sidebarPanel' + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (panel) panel.classList.add('active');
  };
})();

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
      stopPlayback();
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

/* ═══════════════════════════════════════════
   高级参数（侧边栏内嵌）
   ═══════════════════════════════════════════ */
(function() {
  'use strict';

  var defaults = {
    attack: 0.020,
    release: 0.050,
    sustain: 0.70,
    harmonic: 0.15,
    fadeOut: 0.20
  };

  var params = {};
  Object.keys(defaults).forEach(function(k) { params[k] = defaults[k]; });

  window.advancedUpdateParam = function(key, val) {
    var displayMap = {
      attack: { id: 'advAttackVal', scale: 0.001, fixed: 3 },
      release: { id: 'advReleaseVal', scale: 0.001, fixed: 3 },
      sustain: { id: 'advSustainVal', scale: 0.01, fixed: 2 },
      harmonic: { id: 'advHarmonicVal', scale: 0.01, fixed: 2 },
      fadeOut: { id: 'advFadeOutVal', scale: 0.01, fixed: 2 }
    };
    var dm = displayMap[key];
    var value = parseInt(val) * dm.scale;
    params[key] = value;
    document.getElementById(dm.id).textContent = value.toFixed(dm.fixed);
  };

  window.advancedResetDefaults = function() {
    Object.keys(defaults).forEach(function(k) { params[k] = defaults[k]; });
    var resetSlider = function(id, valId, value, text) {
      var el = document.getElementById(id); if (el) el.value = value;
      var vel = document.getElementById(valId); if (vel) vel.textContent = text;
    };
    resetSlider('advAttack', 'advAttackVal', 20, '0.020');
    resetSlider('advRelease', 'advReleaseVal', 50, '0.050');
    resetSlider('advSustain', 'advSustainVal', 70, '0.70');
    resetSlider('advHarmonic', 'advHarmonicVal', 15, '0.15');
    resetSlider('advFadeOut', 'advFadeOutVal', 20, '0.20');
  };

  window.getAdvancedParams = function() { return params; };
})();

/* ═══════════════════════════════════════════
   初始化：应用语言设置
   ═══════════════════════════════════════════ */
(function() {
  // Apply saved language on load, default to English
  var savedLang = localStorage.getItem('midi-tools-lang');
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    window.setLanguage(savedLang);
  } else {
    // No saved preference: apply English (default)
    window.setLanguage('en');
  }
})();