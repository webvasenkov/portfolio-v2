import { memo } from 'react';
import { ICommand } from '../../../app/types';
import ArrowIcon from '../../../public/icons/arrow.svg';
import Text from '../../text';
import Help from './help';
import Projects from './projects';
import NotFound from './notFound';

type Props = {
  commands: ICommand[];
};

function Output({ commands }: Props) {
  function result(command: string) {
    switch (command) {
      case 'help':
        return <Help />;
      case 'projects':
        return <Projects />;
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
            <div className='py-4'>{result(command.name)}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default memo(Output);
