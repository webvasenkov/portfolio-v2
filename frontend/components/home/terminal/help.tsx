import { v4 as uuidv4 } from 'uuid';
import Text from '../../text';

function Help() {
  const commnads = [
    { id: uuidv4(), name: 'help', desc: 'print all commands' },
    { id: uuidv4(), name: 'clear', desc: 'clear terminal' },
    { id: uuidv4(), name: 'projects', desc: 'print my projects' },
    { id: uuidv4(), name: 'tools', desc: 'print my tools' },
    { id: uuidv4(), name: 'social', desc: 'print my social networks' },
    { id: uuidv4(), name: 'cv', desc: 'download my CV' },
    { id: uuidv4(), name: 'exit', desc: 'close this page' },
    {
      id: uuidv4(),
      name: 'message',
      desc: 'send me message to mail\n[-e | --email] - your email address\n[-n | --name] - your name\n[-t | --text] - text of message',
    },
  ];

  const commandsName = commnads.map((command) => ({
    id: command.id,
    name: command.name,
  }));

  const commandsDesc = commnads.map((command) => ({
    id: command.id,
    desc: command.desc,
  }));

  return (
    <div>
      <h3>All commands:</h3>
      <div className='mt-4 flex gap-16'>
        <ul className='flex flex-col gap-2'>
          {commandsName.map((command) => (
            <li key={command.id}>{command.name}</li>
          ))}
        </ul>
        <ul className='flex flex-col gap-2'>
          {commandsDesc.map((command) => (
            <li key={command.id}>
              <Text text={command.desc} />
            </li>
          ))}
        </ul>
      </div>
      <h3 className='mt-4'>Example:</h3>
      <p className='mt-4'>
        $ message -e example@gmail.com -n “Mr. Nobody” -t “Wake up!”
      </p>
    </div>
  );
}

export default Help;
