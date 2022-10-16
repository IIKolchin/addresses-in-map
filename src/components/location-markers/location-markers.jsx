import React, { useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import styles from './location-markers.module.css';
import { useDispatch, useSelector } from 'react-redux';
import '../../Map.css';
import { useMapEvents } from 'react-leaflet/hooks';
import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { setMarker } from '../../store/markerSlice';

export default function LocationMarkers() {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const marker = useRef();
  const forms = useSelector((state) => state.form.forms);
  const markers = useSelector((state) => state.marker.markers);
  const dispatch = useDispatch();

  const map = useMapEvents({
    click(e) {
      if (showSidebar && markers.length - forms.length < 1) {
        dispatch(setMarker(e.latlng));
      }
    },
  });

  return (
    <React.Fragment>
      {markers.map((position, i) => (
        <Marker
          ref={marker}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [30, 45],
              iconAnchor: [15, 5],
            })
          }
          key={i}
          position={position}
        >
          <Popup>
            <h3 className={styles.heading}>{forms[i]?.title}</h3>
            <p className={styles.text}>{forms[i]?.description}</p>
          </Popup>
        </Marker>
      ))}
    </React.Fragment>
  );
}
