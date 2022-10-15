import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import MapComponent from './components/map-component/map-component';
import Portal from './components/portal/portal';
import Sidebar from './components/sidebar/sidebar';
import { fetchData } from './store/dataSlice';
import { setArrMarker, setMarker } from './store/markerSlice';
import { addForm, setArrForm } from './store/formSlice';
import L from 'leaflet';
import LoadingProgress from 'react-js-loading-progress-bar';

function App() {
  // const data = useSelector((state) => state.data.data);

  const dispatch = useDispatch();
  const dataMarker = JSON.parse(localStorage.getItem('markers'));
  const dataForm = JSON.parse(localStorage.getItem('form'));

  useEffect(() => {
    dispatch(fetchData());
    if (dataMarker && dataForm) {
      dispatch(setArrMarker(dataMarker));
      dispatch(setArrForm(dataForm));
    }

  }, []);

  console.log(dataMarker);
  console.log(dataForm);


  return (
    <div className={styles.app}>
      <MapComponent />
    </div>
  );
}

export default App;
