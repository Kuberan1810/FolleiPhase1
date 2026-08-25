class FolleiPcmCapture extends AudioWorkletProcessor {
  constructor() {
    super();
    this.pending = [];
    this.pendingLength = 0;
    this.targetRate = 16000;
    this.blockSize = 4096;
  }

  process(inputs) {
    const channel = inputs[0]?.[0];
    if (!channel?.length) return true;
    this.pending.push(new Float32Array(channel));
    this.pendingLength += channel.length;
    if (this.pendingLength < this.blockSize) return true;

    const merged = new Float32Array(this.pendingLength);
    let offset = 0;
    for (const part of this.pending) {
      merged.set(part, offset);
      offset += part.length;
    }
    this.pending = [];
    this.pendingLength = 0;

    let energy = 0;
    for (let index = 0; index < merged.length; index += 1) energy += merged[index] * merged[index];
    const rms = Math.sqrt(energy / merged.length);

    const ratio = sampleRate / this.targetRate;
    const resultLength = Math.max(1, Math.floor(merged.length / ratio));
    const pcm = new Int16Array(resultLength);
    for (let outputIndex = 0; outputIndex < resultLength; outputIndex += 1) {
      const start = Math.floor(outputIndex * ratio);
      const end = Math.min(merged.length, Math.floor((outputIndex + 1) * ratio));
      let sum = 0;
      for (let inputIndex = start; inputIndex < end; inputIndex += 1) sum += merged[inputIndex];
      const sample = Math.max(-1, Math.min(1, sum / Math.max(1, end - start)));
      pcm[outputIndex] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }
    this.port.postMessage({ type: 'audio', buffer: pcm.buffer, rms }, [pcm.buffer]);
    return true;
  }
}

registerProcessor('follei-pcm-capture', FolleiPcmCapture);
