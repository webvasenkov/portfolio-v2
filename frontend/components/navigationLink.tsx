import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setIsTerminal } from 'features/terminal/terminalSlice';
import MailIcon from 'public/icons/mail.svg';
import TriangleIcon from 'public/icons/triangle.svg';
import cn from 'classnames';
import {
  useGetProjectsQuery,
  useGetToolsQuery,
} from 'features/portfolio/portfolioApi';

function NavigationLink() {
  const dispatch = useAppDispatch();
  const { isTerminal } = useAppSelector((state) => state.terminal);
  const { messageInView } = useAppSelector((state) => state.general);
  const { isLoading: isLoadingProjects } = useGetProjectsQuery();
  const { isLoading: isLoadingTools } = useGetToolsQuery();

  function handleClickOnLink(e: React.MouseEvent) {
    if (isTerminal) {
      dispatch(setIsTerminal(false));
    }

    if (messageInView) {
      e.preventDefault();
      window.scrollTo(0, 0);
    }
  }

  return (
    <a
      href='#message'
      className={cn(
        'grid place-items-center cursor-pointer fixed bottom-10 right-10 xl:right-20 bg-[#202020]/50 border border-white/10 w-max p-2 rounded-md transition opacity-1 hover:bg-[#202020]/70 hover:border-white/30 w-11',
        {
          'invisible opacity-0': isLoadingProjects || isLoadingTools,
        }
      )}
      onClick={handleClickOnLink}>
      <TriangleIcon
        className={cn('opacity-0 h-0 transition', {
          'h-max opacity-100': messageInView,
        })}
      />
      <MailIcon
        className={cn('opacity-0 h-0 transition', {
          'h-max opacity-100': !messageInView,
        })}
      />
      <span className='sr-only'>Send a message</span>
    </a>
  );
}

export default NavigationLink;
