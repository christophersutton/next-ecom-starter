import "../styles/globals.css";
import Layout from "../UI/layout/Layout";
import { ManagedUIContext } from "../UI/context.tsx";

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
