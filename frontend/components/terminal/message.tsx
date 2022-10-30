import { ICommand } from 'app/types';
import { parseMessage } from 'app/utils';
import { useSendMessageMutation } from 'features/portfolio/portfolioApi';
import { useEffect } from 'react';
import Preloader from 'components/preloader';

type Props = {
  fullCommand: ICommand;
};

function Message({ fullCommand }: Props) {
  const payload = parseMessage(fullCommand.name);
  const [sendMessage, { isLoading, isSuccess, isError }] =
    useSendMessageMutation();

  useEffect(() => {
    if (payload?.email && payload?.name && payload?.text) {
      sendMessage(payload);
    }
  }, [sendMessage, payload]);

  if (!payload?.email || !payload?.name || !payload?.text) {
    return (
      <ul>
        <li>{!payload.email && 'email is required argument'}</li>
        <li>{!payload.name && 'name is required argument'}</li>
        <li>{!payload.text && 'text is required argument'}</li>
      </ul>
    );
  }

  return (
    <div>
      {isLoading && <Preloader />}
      {isSuccess && <p>the message has been sent</p>}
      {isError && <p>something went wrong :(</p>}
    </div>
  );
}

export default Message;
