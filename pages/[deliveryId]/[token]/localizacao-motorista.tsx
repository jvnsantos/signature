'use client'
import CustomButton from "@/shared/components/custom-button"
import { Fragment, useState } from "react"

type Props = {
  handleNext: () => void
}
const DriverGeolocalization = ({ handleNext }: Props) => {
  const [lat, setLat] = useState<number | null>(null)
  const [lon, setLon] = useState<number | null>(null)
  const [address, setAddress] = useState<any>("")
  const [loading, setLoading] = useState(false)
  const [mapProps, setMapProps] = useState<any>()

  const handleGetLocation = async () => {
    setLoading(true)
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords
        setLat(latitude)
        setLon(longitude)

        console.log(`Precisão da localização: ${accuracy} metros`)

        const bboxOffset = 0.005
        const bbox = [
          longitude - bboxOffset,
          latitude - bboxOffset,
          longitude + bboxOffset,
          latitude + bboxOffset,
        ]
          .map(coord => coord.toFixed(6))
          .join("%2C")

        const marker = `${latitude.toFixed(6)}%2C${longitude.toFixed(6)}`
        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`
        setMapProps(mapUrl)

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          const data = await res.json()
          console.log(data)
          setAddress(data)
        } catch (error) {
          console.error("Erro ao buscar endereço:", error)
          setAddress("Erro ao buscar endereço")
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error)
        alert("Não foi possível obter a localização.")
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  return (
    <Fragment>

      <div className="d-flex w-100 align-items-start">
        <img className="w-25 me-3 " alt="icone-mapa" src="/assets/images/brand-logos/gps.svg" />
        <div>
          <h3 className="text-gray-900">Marcar localização</h3>
          <span className="text-muted">Habilite a geolocalização do seu navegador para captura da sua localização atual</span>
        </div>
      </div>


      <div className="mt-5">
        <CustomButton
          theme={address ? 'secundary' : 'primary'}
          handleClick={handleGetLocation}
          loading={loading}
          label={address ? 'Marcar novamente' : 'Marcar'}
          title="Marcar localização"
          icon={<i className="bi bi-geo-alt-fill"></i>}
        />
      </div>

      {lat && lon && address && (
        <Fragment>
          <div className="d-flex flex-row gap-2 align-items-center mt-3">
            <i className="bi bi-geo-alt fs-5 text-primary"></i>
            <span>
              {address?.address?.city ?? address?.address?.town}/{address?.address?.state}
            </span>
          </div>
          <div style={{ marginTop: 10 }}>
            {mapProps &&
              <iframe
                src={mapProps}
                width="100%"
                height="100%"
                style={{ border: "none", minHeight: "250px" }}
                loading="lazy"
              ></iframe>
            }
          </div>

          {!loading && <div className="mt-3">
            <CustomButton
              handleClick={handleNext}
              label={<>Avançar</>}
              title="Próximo"
            />
          </div>}

        </Fragment>
      )}
    </Fragment>
  )
}

export default DriverGeolocalization
