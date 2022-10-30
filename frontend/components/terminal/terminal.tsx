import { ChangeEvent, KeyboardEvent, useRef, useEffect, useState } from 'react';
import ArrowIcon from 'public/icons/arrow.svg';
import TextareaAutosize from 'react-textarea-autosize';
import Output from './output';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setIsLoadingData,
  addCommand,
  setCurrentCommand,
} from 'features/terminal/terminalSlice';

function Terminal() {
  const disptach = useAppDispatch();
  const { isLoadingData, commands, currentCommand, history } = useAppSelector(
    (state) => state.terminal
  );
  const [historyIdx, setHistoryIdx] = useState(history.length);
  const terminalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleCommand(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === 'Enter') {
      e.preventDefault();
      const command = { name: currentCommand};
      disptach(addCommand(command));
      disptach(setCurrentCommand(''));

      if (currentCommand == 'cv') {
        window.open('/doc/CV.pdf', '_blank');
      }
    }
  }

  // handle history commands
  function handleUpCommand(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (history.length) {
      if (e.code === 'ArrowUp') {
        const newHistoryIdx = historyIdx > 0 ? historyIdx - 1 : historyIdx;
        disptach(setCurrentCommand(history[newHistoryIdx].name));
        setHistoryIdx(newHistoryIdx);
      }

      if (e.code === 'ArrowDown') {
        const newHistoryIdx =
          historyIdx < history.length ? historyIdx + 1 : historyIdx;
        disptach(setCurrentCommand(history[newHistoryIdx]?.name || ''));
        setHistoryIdx(newHistoryIdx);
      }
    }
  }

  function handleChangeCommand(e: ChangeEvent<HTMLTextAreaElement>) {
    disptach(setCurrentCommand(e.target.value));
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
  }, [disptach, isLoadingData, commands]);

  useEffect(() => {
    setHistoryIdx(history.length);
  }, [history]);

  return (
    <div className='container'>
      <h2 className='font-light mt-32 text-xl w-max mx-auto text-dark-gray/60 dark:text-white/60'>
        Type
        <span className='border border-dark-gray/60 dark:border-white/60 py-0.5 px-2.5 rounded-md mx-4'>
          help
        </span>
        command in the terminal
      </h2>
      <div className='relative mt-8 mb-32 text-white font-terminal mx-auto w-min bg-[#202020]/50 px-8 py-6 rounded-md border border-white/10'>
        <div
          className='overflow-y-auto h-[642px] w-[1000px] 2xl:h-[742px] 2xl:w-[1100px] overflow-hidden'
          ref={terminalRef}
        >
          <Output commands={commands} />
          <div className='flex gap-4'>
            <ArrowIcon />
            <TextareaAutosize
              className='w-full bg-transparent focus:outline-none resize-none caret-white/60'
              onChange={handleChangeCommand}
              value={currentCommand}
              onKeyPress={handleCommand}
              onKeyUp={handleUpCommand}
              ref={textareaRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
