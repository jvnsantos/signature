'use client'
import { API_UPDATE_LOCATION } from "@/pages/api/delivery/update-location.api"
import { useGlobalContext } from "@/shared/context/global-context"
import { PayIPIcon } from "@/shared/svg-component"
import trativeResponseUtils from "@/shared/utils/trative-response.utils"
import { Fragment, useEffect, useState } from "react"

type Props = {
  handleNext: () => void
}
const DriverGeolocalization = ({ handleNext }: Props) => {
  const { delivery, token, setShowHeader, reasonToCancel, setCurrentStep } = useGlobalContext()

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        updateDriverLocation(latitude, longitude)

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          const data = await res.json()
          console.log(data)
        } catch (error) {
          console.error("Erro ao buscar endereço:", error)
        } finally {
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error)
        alert("Não foi possível obter a localização.")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  const updateDriverLocation = async (latitude: number, longitude: number) => {
    try {
      const response = await API_UPDATE_LOCATION({
        payload: { latitude, longitude },
        deliveryId: delivery.id,
        token
      })

      trativeResponseUtils({
        response,
        callBackSuccess: () => {

          if (reasonToCancel.reasonNotDelivery) {
            setCurrentStep(4)
          } else {

            handleNext()
          }
        },
        callBackError: (message) => console.log({ message })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const words = [
    'Estamos coletando sua localização',
    'Isso pode levar alguns segundos...',
    'Estamos coletando sua localização',
    'Aguarde um instante...',
    'Estamos coletando sua localização',
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
    }, 1500) // tempo total para trocar frase

    return () => clearInterval(interval)
  }, [words.length])

  useEffect(() => {
    setShowHeader(false)
    const hasRun = { current: false } as { current: boolean };

    if (!hasRun.current) {
      hasRun.current = true;

      const timer = setTimeout(() => {
        handleGetLocation();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

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
        <PayIPIcon style={{ width: 80, height: 80, marginBottom: 20 }} className="mb-3" />

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

export default DriverGeolocalization





