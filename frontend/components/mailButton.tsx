import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setIsTerminal } from 'features/terminal/terminalSlice';
import MailIcon from 'public/icons/mail.svg';
import cn from 'classnames';
import { useRouter } from 'next/router';
import {
  useGetProjectsQuery,
  useGetToolsQuery,
} from 'features/portfolio/portfolioApi';

function MailButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isTerminal } = useAppSelector((state) => state.terminal);
  const { messageInView } = useAppSelector((state) => state.general);
  const { isLoading: isLoadingProjects } = useGetProjectsQuery();
  const { isLoading: isLoadingTools } = useGetToolsQuery();

  function handleClickOnLink() {
    if (isTerminal) {
      dispatch(setIsTerminal(false));
    }

    router.push('/#message');
  }

  return (
    <button
      className={cn(
        'cursor-pointer fixed bottom-10 right-10 xl:right-20 bg-black/40 w-max p-2 rounded-md transition opacity-1 hover:bg-black/60',
        {
          'invisible opacity-0':
            messageInView || isLoadingProjects || isLoadingTools,
        }
      )}
      onClick={handleClickOnLink}>
      <MailIcon className='stroke-black' onClick={handleClickOnLink} />
      <span className='sr-only'>Send a message</span>
    </button>
  );
}

export default MailButton;
