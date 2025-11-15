import React, { useRef, useState, useEffect } from 'react'
import ChristmasTree from './components/ChristmasTree'
import Snowfall from './components/Snowfall'
import Santa from './components/Santa'
import Fireworks from './components/Fireworks'
import confetti from 'canvas-confetti'
import './App.css'

export default function App() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState({})

  // Calculate time until Christmas
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const christmas = new Date(now.getFullYear(), 11, 25)
      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1)
      }
      
      const difference = christmas - now
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Fireworks effect when music plays
  useEffect(() => {
    let interval
    if (playing) {
      interval = setInterval(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff0000', '#00ff00', '#ffffff']
        })
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [playing])

  const toggleMusic = () => {
    if (!audioRef?.current) return

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(err => console.log('Audio play failed:', err))
    }
  }

  return (
    <div className="christmas-container">
      <audio ref={audioRef} src="/christmas-music.mp3" loop />
      
      <Snowfall />
      <Fireworks playing={playing} />
       
   <h1 className="title">Merry Christmas! 🎅</h1>
    <Santa className="santa-one" />
    <Santa className="santa-two" />
      
      <div className="countdown">
        <div className="countdown-item">{timeLeft.days || 0} Days</div>
        <div className="countdown-item">{timeLeft.hours || 0} Hours</div>
        <div className="countdown-item">{timeLeft.minutes || 0} Minutes</div>
        <div className="countdown-item">{timeLeft.seconds || 0} Seconds</div>
      </div>
      
      <button className="music-btn" onClick={toggleMusic}>
        {playing ? '❌ Pause Music' : '🎵 Play Christmas Music'}
      </button>
      
      <ChristmasTree />
    </div>
  )
}





