import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/layout';
import { Provider } from 'react-redux';
import { store } from 'app/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
