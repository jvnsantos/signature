import "@/styles/globals.scss";
import Contentlayout from "../shared/layout-components/layout/content-layout";
import ErrorPagesLayout from "@/shared/layout-components/layout/errorpages-layout";
import { ContextProvider } from "@/shared/context";
import { I18nProvider } from "@/shared/i18n";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MobileOnlyPage from "@/shared/components/mobile-only";

const layouts: Record<string, any> = {
  Contentlayout: Contentlayout,
  ErrorPagesLayout: ErrorPagesLayout,
};

export default function App({ Component, pageProps }: any) {
  const Layout: any =
    layouts[Component.layout] || ((props: any) => <Component {...props} />);
    
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Limite de tamanho de tablet
  const MAX_WIDTH = 1024;
  const MAX_HEIGHT = 1366;

  useEffect(() => {
    const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    // const isWithinSizeLimit = window.innerWidth <= MAX_WIDTH && window.innerHeight <= MAX_HEIGHT;

    const checkDevice = () => {
      const widthOK = window.innerWidth <= MAX_WIDTH;
      const heightOK = window.innerHeight <= MAX_HEIGHT;
      setIsMobile(isMobileDevice && widthOK && heightOK);
    };

    checkDevice(); // valida na primeira renderização

    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isMobile === null) return null;

  if (!isMobile) return <MobileOnlyPage />;

  return (
    <ContextProvider>
      <I18nProvider>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.route}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </motion.div>
        </AnimatePresence>
      </I18nProvider>
    </ContextProvider>
  );
}
