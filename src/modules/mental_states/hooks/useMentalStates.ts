import { useMemo } from 'react';
import states from '../utils';
import { useAppDispatch } from '../../../store/hooks';
import { mentalStateActions } from '../store/actions';
import { mentalStateSelector } from '../store/selectors';
import { useSelector } from 'react-redux';


export const useMentalStatesActions = () => {
  const dispatch = useAppDispatch()
  return useMemo(() => mentalStateActions(dispatch), [dispatch])
}

export function useMentalStates() {
  return states;
};

export const useMentalStatesState = () => {
  return useSelector(mentalStateSelector)
}

export default useMentalStates;