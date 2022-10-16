import React, { useEffect } from 'react';
import styles from './app.module.css';
import { useDispatch } from 'react-redux';
import MapComponent from '../map-component/map-component';
import { fetchData } from '../../store/dataSlice';
import { setArrMarker } from '../../store/markerSlice';
import { setArrForm } from '../../store/formSlice';

function App() {
  const dispatch = useDispatch();
  const dataMarker = JSON.parse(localStorage.getItem('markers'));
  const dataForm = JSON.parse(localStorage.getItem('form'));

  useEffect(() => {
    dispatch(fetchData());
    if (dataMarker && dataForm) {
      dispatch(setArrMarker(dataMarker));
      dispatch(setArrForm(dataForm));
    }
  }, [dispatch, dataMarker, dataForm]);

  return (
    <div className={styles.app}>
      <MapComponent />
    </div>
  );
}

export default App;
