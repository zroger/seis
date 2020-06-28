import {
  FormEvent,
  useEffect,
  useReducer,
  useState,
} from 'react';

import * as api from '../api';


const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useFetchRoom = (initialRoomID: string|undefined = undefined) => {
  const [roomID, setRoomID] = useState(initialRoomID);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: undefined,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      if (!roomID) {
        return;
      }
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await api.getRoom(roomID);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [roomID]);

  return [state, setRoomID];
};


export function useFormFields(initialState: any) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    (event: FormEvent<HTMLInputElement>) => {
      setValues({
        ...fields,
        [event.currentTarget.id]: event.currentTarget.value,
      });
    }
  ];
}
