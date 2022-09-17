import Head from 'next/head';
import Terminal from '../components/home/terminal/terminal';
import RockIcon from '../public/icons/rock.svg';

function Home() {
  return (
    <>
      <Head>
        <title>Webvasenkov | Portfolio</title>
        <meta
          name='description'
          content='Hi, my name is Denis & I’m frontend enthusiast'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='relative mt-8 text-2xl mx-auto w-max'>
        <span className='absolute -translate-x-full top-2/4 -translate-y-2/4 -left-2'>
          <RockIcon />
        </span>
        Hi, my name is Denis <span className='text-pure'>&</span> I’m frontend
        enthusiast
      </h1>
      <Terminal />
    </>
  );
}

export default Home;
