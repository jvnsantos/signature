import "@/styles/globals.scss";
import Contentlayout from "../shared/layout-components/layout/content-layout";
import ErrorPagesLayout from "@/shared/layout-components/layout/errorpages-layout";
import { ContextProvider } from "@/shared/context";
import { I18nProvider } from "@/shared/i18n";


const layouts: Record<string, any> = {
  Contentlayout: Contentlayout,
  ErrorPagesLayout: ErrorPagesLayout,
};

export default function App({ Component, pageProps }: any) {
  const Layout: any =
    layouts[Component.layout] ||
    ((props: any) => <Component {...props} />);

  return (
    <ContextProvider>
      <I18nProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </ContextProvider>
  );
}
