import { memo } from 'react';
import { ICommand } from 'app/types';
import ArrowIcon from 'public/icons/arrow.svg';
import Text from 'components/text';
import Help from './help';
import Projects from './projects';
import NotFound from './notFound';
import Tools from './tools';
import Socials from './social';
import Message from './message';

type Props = {
  commands: ICommand[];
};

function Output({ commands }: Props) {
  function result(command: string, fullCommand: ICommand) {
    switch (command) {
      case 'help':
        return <Help />;
      case 'projects':
        return <Projects />;
      case 'tools':
        return <Tools />;
      case 'social':
        return <Socials />;
      case 'cv':
        return <></>;
      case 'message':
        return <Message fullCommand={fullCommand}/>;
      default:
        return <NotFound command={command} />;
    }
  }

  return (
    <ul>
      {commands.map((command) => (
        <li className='flex gap-[15px]' key={command.id}>
          <div className='basis-6'>
            <ArrowIcon />
          </div>
          <div className='w-full flex flex-col'>
            <Text text={command.name} />
            <div className='py-4'>{result(command.name.split(' ')[0], command)}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default memo(Output);
