import React, { useEffect, useState } from 'react'
import './Snowfall.css'

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 5 + 5,
      size: Math.random() * 10 + 5,
      opacity: Math.random() * 0.5 + 0.5
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="snowfall">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity
          }}
        />
      ))}
    </div>
  )
}
