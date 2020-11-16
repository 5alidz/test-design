import '../styles/tailwind.css';
import '../styles/main.css';
import '../styles/nprogress.css';

import { AppProps } from 'next/app';
import Nprogress from 'nprogress';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='font-body'>
      <Component {...pageProps} />
    </div>
  );
}
