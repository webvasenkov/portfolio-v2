import BellIcon from 'public/icons/bell.svg';
import { useEffect, useState } from 'react';
import cn from 'classnames';

type Props = {
  message: string;
  reset: boolean
};

function Notification({ message, reset }: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (reset) {
      setIsVisible(true);
      setIsAnimated(false);
    }
  }, [reset])


  return (
    <div
      className={cn(
        'bg-white dark:bg-[#202020] border-md max-w-[300px] w-full p-4 rounded-xl fixed top-16 right-4 xl:right-16 flex gap-4 translate-x-[200%] transition',
        { 'opacity-0': !isVisible, 'translate-x-0': isAnimated }
      )}
    >
      <BellIcon className='shrink-0 fill-dark-gray dark:fill-white' />
      <p>{message}</p>
    </div>
  );
}

export default Notification;
