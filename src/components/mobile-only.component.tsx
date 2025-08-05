'use client';

import { useEffect, useState } from 'react';

export default function MobileOnly({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => {
      const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    check();
  }, []);

  if (!isMobile) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h3>Oou! Esta aplicação só está disponível para dispositivos móveis</h3>
      </div>
    );
  }

  return <>{children}</>;
}