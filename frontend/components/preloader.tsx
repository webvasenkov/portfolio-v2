import cn from 'classnames';

type Props = {
  isLarge?: boolean;
};

function Preloader({ isLarge }: Props) {
  return (
    <span
      className={cn('block w-3 h-3 rounded-full border animate-spin', {
        'w-16 h-16 dark:border-white/60 dark:border-t-white border-dark-gray/40 border-t-dark-gray':
          isLarge,
      })}></span>
  );
}

export default Preloader;
