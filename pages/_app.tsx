import "@/styles/globals.scss";
import Contentlayout from "../shared/layout-components/layout/content-layout";
import ErrorPagesLayout from "@/shared/layout-components/layout/errorpages-layout";
import { ContextProvider } from "@/shared/context";
import { I18nProvider } from "@/shared/i18n";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const layouts: Record<string, any> = {
  Contentlayout: Contentlayout,
  ErrorPagesLayout: ErrorPagesLayout,
};

export default function App({ Component, pageProps }: any) {
  const Layout: any =
    layouts[Component.layout] ||
    ((props: any) => <Component {...props} />);

  const router = useRouter();

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
