import React, { useState, useEffect } from 'react'
import './ChristmasTree.css'

export default function ChristmasTree() {
  const [lights, setLights] = useState([])

  useEffect(() => {
    // Create Christmas lights
    const treeLights = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      color: ['#ff0000', '#00ff00', '#ffff00', '#00ffff', '#ff00ff'][i % 5],
      top: Math.random() * 80 + 10,
      left: Math.random() * 60 + 20,
      delay: Math.random() * 2
    }))
    setLights(treeLights)
  }, [])

  return (
    <div className="tree-container">
      <div className="tree">
        <div className="tree-top"></div>
        <div className="tree-middle"></div>
        <div className="tree-bottom"></div>
        <div className="trunk"></div>
        
        {lights.map(light => (
          <div
            key={light.id}
            className="light"
            style={{
              backgroundColor: light.color,
              top: `${light.top}%`,
              left: `${light.left}%`,
              animationDelay: `${light.delay}s`
            }}
          />
        ))}
        
        <div className="star">⭐</div>
      </div>
    </div>
  )
}
