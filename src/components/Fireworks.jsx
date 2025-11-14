import React, { useEffect, useRef } from 'react'

export default function Fireworks({ playing }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!playing || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 6 - 3
        this.speedY = Math.random() * 6 - 3
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
        this.alpha = 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.alpha -= 0.01
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const createFirework = () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height / 2
      
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y))
      }
    }

    const animate = () => {
      if (!playing) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (Math.random() < 0.1) {
        createFirework()
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        if (particles[i].alpha <= 0) {
          particles.splice(i, 1)
          i--
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [playing])

  if (!playing) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  )
}
