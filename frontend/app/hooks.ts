import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, RootDispatch } from 'app/store';
import { useEffect, useState } from 'react';

export const useAppDispatch: () => RootDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSSR = () => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return isSSR;
};
