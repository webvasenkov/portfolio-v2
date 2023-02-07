import { ITool } from 'app/types';

type Props = {
  isError: boolean;
  isSuccess: boolean;
  data: { tools: ITool[] } | undefined;
};

function Tools({ isError, isSuccess, data }: Props) {
  return (
    <div>
      <div className='flex py-16 flex-col-reverse xl:flex-row gap-16 xl:gap-32 items-center justify-between'>
        <ul className='relative flex justify-center xl:justify-start w-[100%] xl:w-[30%] gap-8 flex-wrap'>
          {isSuccess &&
            data?.tools.map((tool: ITool) => (
              <li key={tool.id}>
                <p className='font-bold text-base xl:text-xl cursor-default'>
                  <span className='text-dark-gray/60 dark:text-white/60 font-light'>#</span>
                  {tool.name}
                </p>
              </li>
            ))}
        </ul>
        {isError && <p>data is broken :(</p>}
        <h2 className='text-3xl text-center xl:text-right xl:text-7xl font-bold w-[100%] xl:w-[70%]'>Tools</h2>
      </div>
    </div>
  );
}

export default Tools;
