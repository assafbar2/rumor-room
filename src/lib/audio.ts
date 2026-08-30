type Cue = 'search' | 'strong' | 'weak' | 'circular' | 'official' | 'accuse' | 'correct' | 'incorrect';

class NoirAudioEngine {
  private started = false;
  private muted = true;
  private tone?: typeof import('tone');
  private bass?: import('tone').MonoSynth;
  private piano?: import('tone').PolySynth;
  private vibraphone?: import('tone').FMSynth;
  private noise?: import('tone').Noise;
  private bassLoop?: import('tone').Loop;
  private dustLoop?: import('tone').Loop;

  async start() {
    if (this.started) return;
    const Tone = await import('tone');
    this.tone = Tone;
    await Tone.start();
    Tone.getDestination().volume.value = -5;

    this.bass = new Tone.MonoSynth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.05, decay: 0.35, sustain: 0.18, release: 1.4 },
      filterEnvelope: { attack: 0.03, decay: 0.3, sustain: 0.1, release: 1, baseFrequency: 60, octaves: 2 },
    }).toDestination();
    this.bass.volume.value = -9;

    this.piano = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle8' },
      envelope: { attack: 0.01, decay: 0.9, sustain: 0, release: 1.7 },
    }).toDestination();
    this.piano.volume.value = -14;

    const echo = new Tone.FeedbackDelay('8n', 0.23).toDestination();
    echo.wet.value = 0.22;
    this.vibraphone = new Tone.FMSynth({
      harmonicity: 3.01,
      modulationIndex: 8,
      envelope: { attack: 0.01, decay: 1.2, sustain: 0, release: 1.8 },
      modulationEnvelope: { attack: 0.01, decay: 0.5, sustain: 0, release: 0.8 },
    }).connect(echo);
    this.vibraphone.volume.value = -9;

    const filter = new Tone.Filter(420, 'lowpass').toDestination();
    this.noise = new Tone.Noise('pink').connect(filter);
    this.noise.volume.value = -34;
    this.noise.start();

    Tone.getTransport().bpm.value = 61;
    this.bassLoop = new Tone.Loop((time) => {
      if (!this.muted) this.bass?.triggerAttackRelease('D1', '8n', time, 0.45);
    }, '1m').start(0);
    this.dustLoop = new Tone.Loop((time) => {
      if (!this.muted && Math.random() > 0.42) {
        this.piano?.triggerAttackRelease(['E3', 'F3', 'B3'], '16n', time, 0.08);
      }
    }, '2m').start('1m');

    Tone.getTransport().start();
    this.started = true;
    this.setMuted(this.muted);
  }

  async setMuted(muted: boolean) {
    this.muted = muted;
    if (!this.started && !muted) await this.start();
    if (this.started) this.tone!.getDestination().mute = muted;
  }

  async cue(cue: Cue) {
    if (this.muted) return;
    if (!this.started) await this.start();
    const Tone = this.tone!;
    const now = Tone.now();

    if (cue === 'search') {
      this.piano?.triggerAttackRelease(['D3', 'Eb3'], '8n', now, 0.35);
    } else if (cue === 'strong') {
      this.vibraphone?.triggerAttackRelease('A4', '8n', now, 0.3);
      this.vibraphone?.triggerAttackRelease('F4', '4n', now + 0.18, 0.28);
    } else if (cue === 'weak') {
      this.piano?.triggerAttackRelease(['C4', 'Db4'], '4n', now, 0.3);
    } else if (cue === 'circular') {
      this.vibraphone?.triggerAttackRelease('D4', '16n', now, 0.24);
      this.vibraphone?.triggerAttackRelease('D4', '16n', now + 0.2, 0.16);
    } else if (cue === 'official') {
      this.bass?.triggerAttackRelease('D1', '4n', now, 0.75);
    } else if (cue === 'accuse') {
      Tone.getTransport().pause();
      this.bass?.triggerAttackRelease('D1', '8n', now, 0.9);
    } else if (cue === 'correct') {
      this.bass?.triggerAttackRelease('D1', '4n', now, 0.5);
      this.vibraphone?.triggerAttackRelease('D4', '8n', now + 0.16, 0.2);
      this.vibraphone?.triggerAttackRelease('A3', '2n', now + 0.34, 0.25);
      Tone.getTransport().start('+0.8');
    } else if (cue === 'incorrect') {
      this.piano?.triggerAttackRelease(['Eb3', 'E3'], '1n', now, 0.28);
    }
  }
}

export const noirAudio = new NoirAudioEngine();
