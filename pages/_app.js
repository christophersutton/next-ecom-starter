import "../styles/globals.css";
import { Layout } from "../components/Layout"
import { _UIContext } from "../components/UI/context"
import { _CartContext } from '../components/Cart/useCart'

function MyApp({ Component, pageProps }) {
  return (
    <_UIContext>
      <_CartContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </_CartContext>
    </_UIContext>
  );
}

export default MyApp;
