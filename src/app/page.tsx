'use client';

import MobileOnly from '@/components/mobile-only.component';
import { useState } from 'react';
import { Button, Form, Container, Image } from 'react-bootstrap';

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    }, () => {
      alert('Erro ao pegar localização.');
    });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = Array.from(files).slice(0, 3).map((file) => URL.createObjectURL(file));
    setPhotos(newPhotos);
  };

  return (
    <MobileOnly>
      <Container className="py-4">
        <h4>App Exclusivo para Celular</h4>

        <Button onClick={getLocation} className="my-3">Ver Localização</Button>
        {location && <p>Latitude: {location.lat}, Longitude: {location.lon}</p>}

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Tirar/Anexar até 3 fotos</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handlePhoto}
          />
        </Form.Group>

        <div className="d-flex gap-2 flex-wrap">
          {photos.map((src, i) => (
            <Image key={i} src={src} thumbnail width={100} height={100} />
          ))}
        </div>
      </Container>
    </MobileOnly>
  );
}
