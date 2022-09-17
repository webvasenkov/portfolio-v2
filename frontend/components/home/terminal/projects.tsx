import ProjectsIcon from '../../../public/icons/projects.svg';
import { useGetProjectsQuery } from '../../../features/projects/projectsApi';

function Projects() {
  const { isLoading, data } = useGetProjectsQuery();

  return (
    <div>
      <ProjectsIcon className='mx-auto mb-4' />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className='grid grid-cols-3 border-white/50'>
            <p className='p-4'>Name</p>
            <p className='p-4'>Description</p>
            <p className='p-4'>Tools</p>
          </div>
          {data?.length ? (
            data.map((proj) => {
              return (
                <div className='grid grid-cols-3' key={proj._id}>
                  <a
                    className=' p-4'
                    href={proj.link}
                    target='blank'
                    rel='noreferrer'
                  >
                    {proj.title}
                  </a>
                  <p className='p-4'>some description for example more words yet more</p>
                  <p className='p-4'>
                    {proj.tags.map((tag) => (
                      <span key={tag._id}>{tag.name.toLowerCase()}, </span>
                    ))}
                  </p>
                </div>
              );
            })
          ) : (
            <p>data is broken :(</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Projects;
