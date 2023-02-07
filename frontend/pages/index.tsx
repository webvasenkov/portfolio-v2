import Head from 'next/head';
import Terminal from 'components/terminal/terminal';
import Graphic from 'components/graphic/graphic';
import RockIcon from 'public/icons/rock.svg';
import { useAppSelector } from 'app/hooks';

function Home() {
  const { isTerminal } = useAppSelector((state) => state.terminal);

  return (
    <>
      <Head>
        <title>Webvasenkov | Portfolio</title>
        <link rel='icon' href='/favicon.svg' />
        <meta
          name='title'
          content='Webvasenkov | Portfolio'
        />
        <meta
          name='description'
          content='Hi, my name is Denis & I’m frontend enthusiast'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://webvasenkov.com/' />
        <meta
          property='og:title'
          content='Webvasenkov | Portfolio'
        />
        <meta
          property='og:description'
          content='Hi, my name is Denis & I’m frontend enthusiast'
        />
        <meta property='og:image' content='https://storage.webvasenkov.com/webvasenkov-portfolio/preview.png' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://webvasenkov.com/' />
        <meta
          property='twitter:title'
          content='Webvasenkov | Portfolio'
        />
        <meta
          property='twitter:description'
          content='Hi, my name is Denis & I’m frontend enthusiast'
        />
        <meta property='twitter:image' content='https://storage.webvasenkov.com/webvasenkov-portfolio/preview.png' />
      </Head>
      <h1 className='font-light px-4 relative mt-8 text-base xl:text-2xl mx-auto max-w-max sm:pl-14 xl:pl-16 text-center'>
        <span className='hidden sm:block absolute -translate-x-full top-1/2 -translate-y-1/2 left-14 scale-75 xl:scale-100'>
          <RockIcon />
        </span>
        Hi, my name is Denis & I’m web enthusiast
      </h1>
      {isTerminal ? <Terminal /> : <Graphic />}
    </>
  );
}

export default Home;
