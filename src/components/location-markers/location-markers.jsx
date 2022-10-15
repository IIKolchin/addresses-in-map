import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import styles from './map-component.module.css';
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



 export default function LocationMarkers() {
    const address = useSelector((state) => state.address.address);
    const title = useSelector((state) => state.form.form.title);
    const description = useSelector((state) => state.form.form.description);
    const showSidebar = useSelector((state) => state.sidebar.showSidebar);
    const marker = useRef();
    const forms = useSelector((state) => state.form.forms);
    const markers = useSelector((state) => state.marker.markers);
    const dispatch = useDispatch();


    const map = useMapEvents({
      click(e) {
        if(showSidebar) {
            dispatch(setMarker(e.latlng));
        }
  
      },
    });
    // console.log(markers);

    return (
      <React.Fragment>
        {markers.map((position, i) => (
          <Marker
            ref={marker}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
            key={i}
            position={position}
          >
    
                <Popup >
                  <p>{forms[i]?.title}</p>
                  <p>{forms[i]?.description}</p>
                </Popup>
      
          </Marker>
        ))}
      </React.Fragment>
    );
  }