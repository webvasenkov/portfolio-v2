import SunIcon from '../public/icons/sun.svg';

function Header() {
  return (
    <div className='relative mt-10 px-20 w-full text-center'>
      <span className='font-display uppercase font-bold text-3xl'>
        <span className='text-pure'>web</span>vasenkov
      </span>
      <button className='absolute right-20 before:absolute before:w-3 before:h-3 before:bg-orange before:rounded-full before:top-3 before:animate-flicker'>
        <span className='sr-only'>Change theme to light</span>
        <SunIcon />
      </button>
    </div>
  );
}

export default Header;
