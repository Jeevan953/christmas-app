import React from 'react'
import './Santa.css'

export default function Santa({ className = "" }) {
  return (
    <div className={`santa-container ${className}`}>
      <div className="santa">
        <div className="santa-body">🎅</div>
        
      </div>
    </div>
  )
}

