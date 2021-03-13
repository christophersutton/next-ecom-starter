import "../styles/globals.css";
import { Layout } from "../components/Layout"
import { ManagedUIContext } from "../components/UI/context"

function MyApp({ Component, pageProps }) {
  return (
    <ManagedUIContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ManagedUIContext>
  );
}

export default MyApp;
