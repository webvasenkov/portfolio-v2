import { useEffect } from 'react';
import { useGetProjectsQuery } from 'features/portfolio/portfolioApi';
import { IProject } from 'app/types';
import { useAppDispatch } from 'app/hooks';
import { setIsLoadingData } from 'features/terminal/terminalSlice';
import ProjectsIcon from 'public/icons/projects.svg';
import Preloader from 'components/preloader';

function Projects() {
  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess, data } = useGetProjectsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setIsLoadingData(true));
    }
  }, [dispatch, data]);

  return (
    <div>
      <ProjectsIcon className='mx-auto mb-4' />
      {isLoading && <Preloader />}
      {isSuccess && (
        <div>
          <div className='grid grid-cols-3 border-b border-white/20'>
            <p className='p-4'>name</p>
            <p className='p-4'>description</p>
            <p className='p-4'>tools</p>
          </div>
          {data.projects.map((proj: IProject) => {
            return (
              <a
                className='grid grid-cols-3 border-b border-white/20 hover:border-white transition'
                key={proj.id}
                href={proj.link}
                target='blank'
                rel='noreferrer'
              >
                <p className='p-4'>{proj.name}</p>
                <p className='p-4'>{proj.desc}</p>
                <p className='p-4'>
                  {proj.tools.map((tool) => tool.name).join(', ')}
                </p>
              </a>
            );
          })}
        </div>
      )}
      {isError && <p>data is broken :(</p>}
    </div>
  );
}

export default Projects;
