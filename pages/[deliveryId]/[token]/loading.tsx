'use client'
import { PayIPIcon } from "@/shared/svg-component"
import { Fragment, useState, useEffect } from "react"

const LoadingPage = () => {
  const words = [
    'Isso pode levar alguns segundos...',
    'Estamos processando sua solicitação...',
    'Aguarde um instante...',
    'Quase lá...'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Faz fade-out
      setFade(false)

      setTimeout(() => {
        // Troca frase
        setCurrentIndex((prev) => (prev + 1) % words.length)
        // Faz fade-in
        setFade(true)
      }, 300) // tempo do fade-out
    }, 2500) // tempo total para trocar frase

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <Fragment>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#fff'
      }}>
        <PayIPIcon style={{ width: 80, height: 80, marginBottom: 20 }} />

        <p
          style={{
            fontSize: '1.2rem',
            color: '#333',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          {words[currentIndex]}
        </p>
      </div>
    </Fragment>
  )
}

export default LoadingPage
