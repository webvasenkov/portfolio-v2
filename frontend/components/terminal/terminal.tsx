import { ChangeEvent, KeyboardEvent, useRef, useEffect, useState } from 'react';
import ArrowIcon from 'public/icons/arrow.svg';
import TextareaAutosize from 'react-textarea-autosize';
import Output from './output';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setIsLoadingData, addCommand } from 'features/terminal/terminalSlice';
import { parseMessage } from 'app/utils';

function Terminal() {
  const disptach = useAppDispatch();
  const { isLoadingData, commands, history } = useAppSelector(
    (state) => state.terminal
  );
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIdx, setHistoryIdx] = useState(history.length);
  const terminalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleCommand(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === 'Enter') {
      e.preventDefault();
      disptach(addCommand(currentCommand));
      setCurrentCommand('');

      if (currentCommand == 'cv') {
        window.open('/doc/CV.pdf', '_blank');
      }

      if (currentCommand.split(' ')[0] == 'message') {
        const messagePayload = parseMessage(currentCommand);
      }
    }
  }

  // show prev command
  function handleUpCommand(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (history.length) {
      if (e.code === 'ArrowUp') {
        const newHistoryIdx = historyIdx > 0 ? historyIdx - 1 : historyIdx;
        setCurrentCommand(history[newHistoryIdx].name);
        setHistoryIdx(newHistoryIdx);
      }

      if (e.code === 'ArrowDown') {
        const newHistoryIdx =
          historyIdx < history.length ? historyIdx + 1 : historyIdx;
        setCurrentCommand(history[newHistoryIdx]?.name || '');
        setHistoryIdx(newHistoryIdx);
      }
    }
  }

  function handleChangeCommand(e: ChangeEvent<HTMLTextAreaElement>) {
    setCurrentCommand(e.target.value);
  }

  // focus on textarea when companent mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, [textareaRef]);

  // scroll down if type command
  useEffect(() => {
    if (isLoadingData || commands.length) {
      terminalRef?.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth',
      });

      disptach(setIsLoadingData(false));
    }
  }, [isLoadingData, commands]);

  useEffect(() => {
    setHistoryIdx(history.length);
  }, [history]);

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
              onChange={handleChangeCommand}
              value={currentCommand}
              onKeyPress={handleCommand}
              onKeyUp={handleUpCommand}
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
