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
      'btn.loop': '🔁 循环',
      'btn.loop.on': '🔁 循环:开',
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
      'btn.loop': '🔁 Loop',
      'btn.loop.on': '🔁 Loop:ON',
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
    var langBtns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < langBtns.length; i++) {
      langBtns[i].classList.toggle('active', langBtns[i].getAttribute('data-lang') === lang);
    }

    // Update all data-i18n elements
    var i18nEls = document.querySelectorAll('[data-i18n]');
    for (var j = 0; j < i18nEls.length; j++) {
      var el = i18nEls[j];
      var key = el.getAttribute('data-i18n');
      var val = I18N[lang][key];
      if (val !== undefined) el.textContent = val;
    }

    // Update placeholders
    var phEls = document.querySelectorAll('[data-i18n-placeholder]');
    for (var k = 0; k < phEls.length; k++) {
      var phEl = phEls[k];
      var phKey = phEl.getAttribute('data-i18n-placeholder');
      var phVal = I18N[lang][phKey];
      if (phVal !== undefined) phEl.placeholder = phVal;
    }

    // Update innerHTML elements
    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var m = 0; m < htmlEls.length; m++) {
      var htmlEl = htmlEls[m];
      var htmlKey = htmlEl.getAttribute('data-i18n-html');
      var htmlVal = I18N[lang][htmlKey];
      if (htmlVal !== undefined) htmlEl.innerHTML = htmlVal.replace(/\n/g, '<br>');
    }

    // Update document title
    document.title = 'MIDI ' + I18N[lang]['app.title'];

    // Refresh dynamic UI text
    if (window._midiRefreshLang) window._midiRefreshLang();
  };

  // Load saved language preference (applied by inline script in HTML)
  var savedLang = localStorage.getItem('midi-tools-lang');
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    currentLang = savedLang;
  }
})();