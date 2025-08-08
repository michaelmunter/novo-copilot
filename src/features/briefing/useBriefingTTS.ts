// features/briefing/useBriefingTTS.ts
export function useBriefingTTS() {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

  const pickVoice = () => {
    if (!synth) return null
    const voices = synth.getVoices()
    const prefer = [
      'Microsoft Aria Online (Natural) - English (United States)',
      'Microsoft Aria Online (Natural)',
      'Google US English',
      'Samantha', // macOS
    ]
    return (
      voices.find((v) => prefer.includes(v.name)) ||
      voices.find(
        (v) =>
          v.lang?.toLowerCase().startsWith('en-us') && /female/i.test(v.name)
      ) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith('en')) ||
      voices[0] ||
      null
    )
  }

  const speak = (text: string) => {
    if (!synth || !text) return
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const voice = pickVoice()
    if (voice) u.voice = voice
    u.rate = 1.0
    u.pitch = 1.0
    synth.speak(u)
  }

  const stop = () => synth?.cancel()
  const isSpeaking = () => !!synth && synth.speaking

  return { speak, stop, isSpeaking }
}
