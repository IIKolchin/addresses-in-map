import React, { useRef } from 'react';
import { Marker } from 'react-leaflet';
import { useAppDispatch, useSelector } from '../../store/index';
import '../../Map.css';
// @ts-ignore
import { useMapEvents } from 'react-leaflet/hooks';
import { Icon } from 'leaflet';
import red from '../../images/red.svg';
import { setMarker } from '../../store/markerSlice';
import { IMarker } from '../../services/types';

export default function NewLocationMarkers() {
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const marker = useRef(null);
  const forms = useSelector((state) => state.form.forms);
  const markers = useSelector((state) => state.marker.markers);
  const dispatch = useAppDispatch();

  const map = useMapEvents({
    click(e: { latlng: IMarker }) {
      if (showSidebar && markers.length - forms.length < 1) {
        dispatch(setMarker(e.latlng));
      }
    },
  });

  return (
    <React.Fragment>
      {markers.length - forms.length === 1 && (
        <Marker
          ref={marker}
          icon={
            new Icon({
              iconUrl: red,
              iconSize: [50, 65],
              iconAnchor: [15, 5],
            })
          }
          position={markers[markers.length - 1]}
        ></Marker>
      )}
    </React.Fragment>
  );
}
