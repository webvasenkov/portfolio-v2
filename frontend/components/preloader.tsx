import cn from 'classnames';

type Props = {
  isLarge?: boolean;
};

function Preloader({ isLarge }: Props) {
  return (
    <span
      className={cn(
        'block w-3 h-3 rounded-full border border-white/60 border-t-white animate-spin',
        { 'w-16 h-16': isLarge }
      )}></span>
  );
}

export default Preloader;
