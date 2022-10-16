
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store/index';
import MapComponent from '../map-component/map-component';
import { fetchData } from '../../store/dataSlice';
import { setArrMarker } from '../../store/markerSlice';
import { setArrForm } from '../../store/formSlice';

function App() {
  const dispatch = useAppDispatch();
  const dataMarker = JSON.parse(localStorage.getItem('markers') as string);
  const dataForm = JSON.parse(localStorage.getItem('form') as string);

  useEffect(() => {
    dispatch(fetchData());
    if (dataMarker && dataForm) {
      dispatch(setArrMarker(dataMarker));
      dispatch(setArrForm(dataForm));
    }
  }, [dispatch, dataMarker, dataForm]);

  return (
    <div>
      <MapComponent />
    </div>
  );
}

export default App;
