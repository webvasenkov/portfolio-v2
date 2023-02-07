import { IProject } from 'app/types';
import Image from 'next/image';

type Props = {
  isError: boolean;
  isSuccess: boolean;
  data: { projects: IProject[] } | undefined;
};

function Projects({ isError, isSuccess, data }: Props) {
  return (
    <div>
      <div className='flex py-16 gap-16 xl:gap-32 items-center justify-between flex-col xl:flex-row'>
        <h2 className='text-3xl text-center xl:text-left xl:text-7xl font-bold w-[100%] xl:w-[30%]'>Projects</h2>
        <div className='relative flex flex-col gap-8 xl:gap-0 w-[100%] xl:w-[70%]'>
          {isSuccess &&
            data?.projects.map((proj: IProject, idx: number) => (
              <a
                className='block relative group cursor-pointer p-8 rounded-md overflow-hidden flex justify-between items-center gap-4'
                href={proj.link}
                key={proj.id}
                target='_blank'
                rel='noreferrer'
              >
                <div>
                  <h3 className='text-xl xl:text-2xl font-bold text-white xl:text-dark-gray dark:text-white group-hover:text-white transition'>{proj.name}</h3>
                  <p className='text-base xl:text-xl font-light text-white/60 xl:text-dark-gray/60 dark:text-white/60 group-hover:text-white/60'>
                    {proj.desc}
                  </p>
                  <div className='before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-gradient-to-r before:from-red before:to-blue before:animate-gradient before:bg-[length:200%_200%] before:opacity-50 xl:before:opacity-0 group-hover:before:opacity-50 before:-z-10 before:transition after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:bg-black after:opacity-70 xl:after:opacity-0 group-hover:after:opacity-70 after:-z-20 after:transition'>
                    <Image
                      className='opacity-100 xl:opacity-0 -z-30 group-hover:opacity-100 transition'
                      src={proj.img}
                      layout='fill'
                      objectFit='cover'
                      alt={proj.name}
                    />
                  </div>
                </div>
                <span className='dark:text-white text-white xl:text-dark-gray group-hover:text-white transition'>0{idx + 1}</span>
              </a>
            ))}
        </div>
        {isError && <p>data is broken :(</p>}
      </div>
    </div>
  );
}

export default Projects;
