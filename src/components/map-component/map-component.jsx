import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './map-component.module.css';
import { useDispatch, useSelector } from 'react-redux';
import '../../Map.css';
import { useMapEvents, useMap } from 'react-leaflet/hooks';
import L from 'leaflet';
import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import Portal from '../portal/portal';
import Sidebar from '../sidebar/sidebar';
import LCG from 'leaflet-control-geocoder';
import { setPosition } from '../../store/addressSlice';
import { getMarker, setMarker } from '../../store/markerSlice';
import { openSidebar } from '../../store/stateSidebarSlice';
import LocationMarkers from '../location-markers/location-markers';
import { GetCoordinates } from '../get-coordinates/get-coordinates';
import { showButtonAdd } from '../../store/stateButtonAddSlice';
import LoadingProgress from 'react-js-loading-progress-bar';
import { Loader } from '../loader/loader';

function MapComponent() {
  const address = useSelector((state) => state.address.address);
  const [loading, setLoading] = useState(true);
  const title = useSelector((state) => state.form.form.title);
  const description = useSelector((state) => state.form.form.description);
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const marker = useRef();
  const forms = useSelector((state) => state.form.forms);
  const buttonAdd = useSelector((state) => state.addButton.showButton);
  const markers = useSelector((state) => state.marker.markers);

  const dispatch = useDispatch();
  //   const [position, setPosition] = useState(null);
  //   const [showSidebar, setShowSidebar] = useState(false);
  const geocoder = L.Control.Geocoder.nominatim();
  //   const [address, setAdress] = useState();

  useEffect(() => {
    dispatch(getMarker(marker.current));
    setLoading(false);
  }, []);
  // console.log(address)
  // console.log(geocoder)
  const onClick = () => {
    dispatch(openSidebar(true));
    dispatch(showButtonAdd(false));
  };

  if (loading) {
    return <Loader />;
  }

  console.log(forms);
  localStorage.setItem('form', JSON.stringify(forms));
  return (
    <>
      {showSidebar && <Sidebar address={address} />}
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
