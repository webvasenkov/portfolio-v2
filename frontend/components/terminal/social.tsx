import { useEffect } from 'react';
import { useGetSocialsQuery } from 'features/portfolio/portfolioApi';
import { setIsLoadingData } from 'features/terminal/terminalSlice';
import { useAppDispatch } from 'app/hooks';
import { ISocial } from 'app/types';

function Socials() {
  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess, data } = useGetSocialsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setIsLoadingData(true));
    }
  }, [data]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <ul>
          {data.socials.map((social: ISocial) => {
            return (
              <li key={social.id}>
                <a
                  className='border-b border-white/20 ease-in-out hover:border-white'
                  href={social.link}
                  target='blank'
                  rel='noreferrer'
                >
                  {social.name}
                </a>
              </li>
            );
          })}
        </ul>
      )}
      {isError && <p>data is broken :(</p>}
    </div>
  );
}

export default Socials;
