import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { ICommand } from '../../../app/types';
import { processCurrentCommand } from '../../../app/utils';
import { v4 as uuidv4 } from 'uuid';
import ArrowIcon from '../../../public/icons/arrow.svg';
import TextareaAutosize from 'react-textarea-autosize';
import Output from './output';

function Terminal() {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commands, setCommands] = useState<ICommand[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleOnPressCommand(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === 'Enter') {
      const id = uuidv4();
      e.preventDefault();

      setCommands((prev) => [
        ...prev,
        {
          id,
          name: processCurrentCommand(currentCommand),
        },
      ]);

      setCurrentCommand('');

      if (currentCommand == 'clear') {
        setCommands([]);
      }
    }
  }

  function handleOnChangeCommand(e: ChangeEvent<HTMLTextAreaElement>) {
    setCurrentCommand(e.target.value);
  }

  // focus on textarea when companent mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, [textareaRef]);

  // scroll down if type command
  useEffect(() => {
    if (commands.length) {
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [commands]);

  return (
    <>
      <h2 className='mt-8 2xl:mt-20 3xl:mt-32 text-xl w-max mx-auto'>
        Type
        <span className='border border-white py-0.5 px-2.5 rounded-md mx-4'>
          help
        </span>
        command in the terminal
      </h2>
      <div className='relative my-8 font-terminal mx-auto w-min bg-[#202020]/50 px-8 py-6 rounded-md border border-white/10'>
        <div
          className='overflow-y-auto h-[442px] w-[900px] 2xl:h-[542px] 2xl:w-[1000px] 3xl:h-[742px] 3xl:w-[1200px] overflow-hidden'
          ref={terminalRef}
        >
          <Output commands={commands} />
          <div className='flex gap-4'>
            <ArrowIcon />
            <TextareaAutosize
              className='w-full bg-transparent focus:outline-none resize-none'
              onChange={handleOnChangeCommand}
              value={currentCommand}
              onKeyPress={handleOnPressCommand}
              ref={textareaRef}
            />
          </div>
        </div>
        <span className='absolute block w-[1200px] h-[1200px] bg-pure-neon -translate-x-2/4 -translate-y-2/4 top-0 left-0 -z-10'></span>
        <span className='absolute block w-[1200px] h-[1200px] bg-orange-neon translate-x-2/4 translate-y-2/4 bottom-0 right-0 -z-10'></span>
      </div>
    </>
  );
}

export default Terminal;
