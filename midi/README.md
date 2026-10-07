# MIDI Tools

> [Русский](README_ru.md) | [中文](README_zh.md)

A zero-dependency, browser-based MIDI text editor and audio export toolset. Compose music using Just Intonation frequency ratios, with real-time playback, waveform control, and WAV/MIDI export.

---

## Quick Start

Open `index.html` directly in any modern browser — no installation or build tools required.

```
midi-tools/
├── index.html        # Main page
├── css/
│   └── style.css     # Stylesheet
├── js/
│   └── app.js        # Core logic
├── README.md         # English documentation
└── README_zh.md      # Chinese documentation
```

---

## Features

### MIDI Editor

Write notes in plain text, played sequentially from top to bottom. One note per line, four fields separated by commas:

| Field    | Format    | Description | Default |
|----------|-----------|-------------|---------|
| Duration | `num/den` | `1/1` = quarter note, `1/2` = eighth note, `1/8` = thirty-second note | `1/1` |
| Pitch    | `num/den` | Just intonation ratio. `1/1` = root, `4/3` = perfect fourth, `3/2` = perfect fifth | `1/1` |
| Size     | `01` ~ `10` | Two-digit number controlling velocity | `10` |
| ID       | `00` ~ `99` | Two-digit identifier, does not affect playback | empty |

Example:

```
1/1,1/1,10,01
1/1,9/8,10,02
1/1,5/4,10,03
1/1,4/3,10,04
1/1,3/2,10,05
1/1,5/3,10,06
1/1,15/8,10,07
1/1,2/1,10,08
```

Lines starting with `//` or `#` are treated as comments.

#### Editor Capabilities

- **Live Parsing** — instant parsing on input; error lines highlighted in red with line numbers
- **Play / Pause / Stop** — resume playback from the last paused position
- **BPM Control** — 20–400 BPM, via slider and numeric input
- **Speed Multiplier** — 0.25x–4x, with quick presets: 0.5x / 1x / 1.5x / 2x
- **Base Frequency** — default 261.63 Hz (middle C), freely adjustable
- **Volume** — 0–100%
- **Waveform** — triangle / sine / square / sawtooth
- **ADSR Envelope** — each note shaped with attack, decay, sustain, and release
- **Overtone Layer** — each note blends a 2× frequency sine overtone
- **Playback Highlight** — current line and gutter number highlighted during playback
- **Note Info Panel** — real-time display of duration, pitch, frequency, velocity, and ID
- **Built-in Templates** — just intonation scale, "Twinkle Twinkle" melody, and chord progression examples
- **Import / Export** — import `.txt` score files, export as `.txt`
- **Auto-save** — editor content automatically persisted to localStorage

#### Keyboard Shortcuts

| Key       | Action           |
|-----------|------------------|
| `Space`   | Play / Pause     |
| `Escape`  | Stop             |
| `Ctrl+S`  | Export score     |
| `Tab`     | Insert indent    |

---

### Audio Export

Switch to the "Audio Export" tab to render editor notes into audio files.

#### WAV Export

- Uses OfflineAudioContext for offline rendering, faithfully reproducing the editor's tone
- Supports 44100 / 48000 / 96000 Hz sample rates
- Supports 16-bit / 24-bit depth
- Preserves waveform selection, ADSR envelope, and overtone blending

#### MIDI Export

- Maps just intonation frequency ratios to the nearest standard MIDI note numbers
- Uses Acoustic Grand Piano (Program 0) by default
- Two note-length modes:
  - **Actual Duration** — precise mapping of the score's defined durations
  - **Fixed Eighth Note** — all notes unified to eighth-note length
- Standard MIDI Format 0, PPQN = 480

#### Export Preview

- Live display of note count, total duration (beats), effective BPM, estimated duration (seconds)
- Note list preview, auto-refreshed when switching to this tab

---

## Architecture

### Browser Compatibility

- Requires Web Audio API (supported by all modern browsers)
- Recommended: latest Chrome / Edge / Firefox

### Core Modules

| Module               | File                | Responsibility |
|----------------------|---------------------|----------------|
| Tab Navigation       | `app.js` (L1–31)    | Tab switching and state coordination |
| MIDI Editor Engine   | `app.js` (L33–590)  | Parsing, playback, pause, UI updates |
| Audio Export Tool    | `app.js` (L592–898) | WAV encoding, MIDI generation, offline rendering |
| Stylesheet           | `style.css`         | Dark theme, responsive layout |

### Audio Engine Pipeline

```
Editor Input
    │
    ▼
parseEditor() ── parse text into parsedNotes[]
    │
    ▼
play() ── schedule oscillators via AudioContext
    │
    ├── Oscillator (primary tone) ── Gain (ADSR) ──┐
    │                                                ├── destination
    ├── Oscillator (2× overtone)  ── Gain ─────────┘
    │
    ▼
scheduleUIUpdates() ── playback highlight driven by requestAnimationFrame
```

---

## Design Philosophy

- **Just Intonation First** — pitch expressed as frequency ratios, not bound to twelve-tone equal temperament; supports arbitrary tuning systems
- **Text as Score** — human-readable and writable, easy to version-control, share, and batch-edit
- **Zero Dependencies** — plain HTML/CSS/JS, no frameworks or build tools
- **Fully Offline** — all assets local, no network connection required

---

## License

MIT License