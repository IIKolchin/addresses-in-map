import React, { useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import styles from './location-markers.module.css';
import { useSelector } from '../../store/index';
import '../../Map.css';
import { Icon } from 'leaflet';
import blue from '../../images/blue.svg';


export default function LocationMarkers() {
  const marker = useRef(null);
  const forms = useSelector((state) => state.form.forms);
  const markers = useSelector((state) => state.marker.markers);

  return (
    <React.Fragment>
      {markers.map((position, i) => {
        return (
          <Marker
            ref={marker}
            icon={
              new Icon({
                iconUrl: blue,
                iconSize: [50, 65],
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
        );
      })}
    </React.Fragment>
  );
}
