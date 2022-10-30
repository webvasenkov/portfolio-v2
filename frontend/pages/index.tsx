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
        <meta
          name='description'
          content='Hi, my name is Denis & I’m frontend enthusiast'
        />
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <h1 className='font-light px-4 relative mt-8 text-base xl:text-2xl mx-auto max-w-max sm:pl-14 xl:pl-16 text-center'>
        <span className='hidden sm:block absolute -translate-x-full top-1/2 -translate-y-1/2 left-14 scale-75 xl:scale-100'>
          <RockIcon />
        </span>
        Hi, my name is Denis & I’m frontend enthusiast
      </h1>
      {isTerminal ? <Terminal /> : <Graphic />}
    </>
  );
}

export default Home;
