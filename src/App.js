import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import MapComponent from './components/map-component/map-component';
import Portal from './components/portal/portal';
import Sidebar from './components/sidebar/sidebar';
import { fetchData } from './store/dataSlice';

function App() {

  // const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData())
    },[dispatch])

  return (
    <div className={styles.app}>
      <MapComponent />
    </div>
  );
}

export default App;
