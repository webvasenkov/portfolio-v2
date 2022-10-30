import { useEffect } from 'react';
import { useGetToolsQuery } from 'features/portfolio/portfolioApi';
import { setIsLoadingData } from 'features/terminal/terminalSlice';
import { useAppDispatch } from 'app/hooks';
import { ITool } from 'app/types';
import Preloader from 'components/preloader';

function Tools() {
  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess, data } = useGetToolsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setIsLoadingData(true));
    }
  }, [dispatch, data]);

  return (
    <div>
      {isLoading && <Preloader/>}
      {isSuccess && (
        <ul>
          {data.tools.map((tool: ITool) => {
            return <li key={tool.id}>{tool.name}</li>;
          })}
        </ul>
      )}
      {isError && <p>data is broken :(</p>}
    </div>
  );
}

export default Tools;
