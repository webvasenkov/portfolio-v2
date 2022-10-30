import { useTheme } from 'next-themes';
import { useAppDispatch, useAppSelector, useSSR } from 'app/hooks';
import { setIsTerminal } from 'features/terminal/terminalSlice';
import SunIcon from 'public/icons/sun.svg';
import MoonIcon from 'public/icons/moon.svg';
import cn from 'classnames';

function Header() {
  const dispatch = useAppDispatch();
  const { systemTheme, theme, setTheme } = useTheme();
  const { isTerminal } = useAppSelector((state) => state.terminal);
  const isSSR = useSSR();

  function handleClickOnCLIButton() {
    dispatch(setIsTerminal(true));
  }

  function handleClickOnGUIButton() {
    dispatch(setIsTerminal(false));
  }

  function renderThemeChanger() {
    if (isSSR) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <button onClick={() => setTheme('light')}>
          <span className='sr-only'>Change theme to light</span>
          <SunIcon className='xl:animate-spin-slow hover:opacity-60 transition' />
        </button>
      );
    }

    return (
      <button onClick={() => setTheme('dark')}>
        <span className='sr-only'>Change theme to dark</span>
        <MoonIcon className='hover:opacity-60 transition'/>
      </button>
    );
  }

  return (
    <div className='relative mt-10 px-20 w-full'>
      <span className='block font-display uppercase font-bold text-2xl xl:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red to-blue animate-gradient w-max mx-auto bg-[length:200%_200%] cursor-default'>
        webvasenkov
      </span>
      <div className='none absolute right-10 xl:right-20 top-1/2 -translate-y-1/2 flex gap-x-5 font-medium'>
        <div className='hidden xl:block'>
          <button
            className={cn('text-dark-gray/60 hover:text-dark-gray dark:text-white/60 dark:hover:text-white transition', {
              'dark:text-white text-dark-gray': isTerminal,
            })}
            onClick={handleClickOnCLIButton}>
            CLI
          </button>
          <span className='text-dark-gray/60 dark:text-white/60 cursor-pointer'> | </span>
          <button
            className={cn('text-dark-gray/60 hover:text-dark-gray dark:text-white/60 dark:hover:text-white transition', {
              'dark:text-white text-dark-gray': !isTerminal,
            })}
            onClick={handleClickOnGUIButton}>
            GUI
          </button>
        </div>
        {renderThemeChanger()}
      </div>
    </div>
  );
}

export default Header;
