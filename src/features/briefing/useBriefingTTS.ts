// features/briefing/useBriefingTTS.ts
import { useEffect, useRef, useState } from 'react'

export function useBriefingTTS() {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
  const [speaking, setSpeaking] = useState<boolean>(false)
  const speakingRef = useRef(false)
  speakingRef.current = speaking

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
    u.onstart = () => setSpeaking(true)
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    synth.speak(u)
  }

  const stop = () => {
    if (!synth) return
    synth.cancel()
    setSpeaking(false)
  }

  // keep React state in sync if something external interrupts TTS
  useEffect(() => {
    if (!synth) return
    let raf = 0
    const tick = () => {
      const now = synth.speaking
      if (now !== speakingRef.current) setSpeaking(now)
      raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [synth])

  return { speak, stop, isSpeaking: speaking }
}
