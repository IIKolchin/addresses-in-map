import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from './map-component.module.css';
import { useDispatch, useSelector } from 'react-redux';
import '../../Map.css';
import Sidebar from '../sidebar/sidebar';
import { getMarker } from '../../store/markerSlice';
import { openSidebar } from '../../store/stateSidebarSlice';
import LocationMarkers from '../location-markers/location-markers';
import { GetCoordinates } from '../get-coordinates/get-coordinates';
import { showButtonAdd } from '../../store/stateButtonAddSlice';
import { Loader } from '../loader/loader';

function MapComponent() {
  const [loading, setLoading] = useState(true);
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const marker = useRef();
  const forms = useSelector((state) => state.form.forms);
  const buttonAdd = useSelector((state) => state.addButton.showButton);
  const markers = useSelector((state) => state.marker.markers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMarker(marker.current));
    setLoading(false);
  }, [dispatch]);

  const onClick = () => {
    dispatch(openSidebar(true));
    dispatch(showButtonAdd(false));
  };

  if (loading) {
    return <Loader />;
  }
  localStorage.setItem('form', JSON.stringify(forms));
  
  return (
    <>
      {showSidebar && <Sidebar />}
      {!showSidebar && markers.length === 0 && (
        <div className={styles.overlay}>Пусто</div>
      )}
      <MapContainer
        center={{ lat: 55.7522, lng: 37.6156 }}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <GetCoordinates />
        <LocationMarkers />
      </MapContainer>

      {buttonAdd && (
        <button onClick={onClick} className={styles.button}>
          Добавить адрес
        </button>
      )}
    </>
  );
}

export default MapComponent;
