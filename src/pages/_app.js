import Layout from "@component/components/Layout";
import "@component/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
