import React, { useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import styles from './location-markers.module.css';
import { useAppDispatch, useSelector } from '../../store/index';
import '../../Map.css';
// @ts-ignore
import { useMapEvents } from 'react-leaflet/hooks';
import { Icon } from 'leaflet';
// @ts-ignore
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { setMarker } from '../../store/markerSlice';
import { IMarker } from '../../services/types';


export default function LocationMarkers() {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const marker = useRef(null);
  const forms = useSelector((state) => state.form.forms);
  const markers = useSelector((state) => state.marker.markers);
  const dispatch = useAppDispatch();

  const map = useMapEvents({
    click(e: { latlng: IMarker; }) {
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
            <h3 className={styles.heading}>{forms[i]?.title }</h3>
            <p className={styles.text}>{forms[i]?.description}</p>
          </Popup>
        </Marker>
      ))}
    </React.Fragment>
  );
}
