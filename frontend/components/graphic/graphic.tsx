import Preloader from 'components/preloader';
import { useGetProjectsQuery } from 'features/portfolio/portfolioApi';
import { useGetToolsQuery } from 'features/portfolio/portfolioApi';
import Message from './message';
import Projects from './projects';
import Tools from './tools';

function Graphic() {
  const {
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
    isSuccess: isSuccessProjects,
    data: dataProjcts,
  } = useGetProjectsQuery();
  const {
    isLoading: isLoadingTools,
    isError: isErrorTools,
    isSuccess: isSuccessTools,
    data: dataTools,
  } = useGetToolsQuery();

  if (isLoadingProjects || isLoadingTools) {
    return (
      <div className='flex justify-center items-center mt-32'>
        <Preloader isLarge={true} />
      </div>
    );
  }

  return (
    <div className='container my-32 flex flex-col space-y-32'>
      <Projects
        isError={isErrorProjects}
        isSuccess={isSuccessProjects}
        data={dataProjcts}
      />
      <Tools
        isError={isErrorTools}
        isSuccess={isSuccessTools}
        data={dataTools}
      />
      <Message />
    </div>
  );
}

export default Graphic;
