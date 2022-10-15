import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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

export const GetCoordinates = () => {
  const geocoder = L.Control.Geocoder.nominatim();
  const address = useSelector((state) => state.address.address);
  const title = useSelector((state) => state.form.form.title);
  const description = useSelector((state) => state.form.form.description);
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const marker = useRef();
  const forms = useSelector((state) => state.form.forms);

  const dispatch = useDispatch();
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const info = L.DomUtil.create('div', 'legend');

    const positon = L.Control.extend({
      onAdd: function () {
        return info;
      },
    });

    // map.on('click', (e) => {
    //   geocoder.reverse(
    //     e.latlng,
    //     map.options.crs.scale(map.getZoom()),
    //     (results) => {

    //       const r = results[0]?.properties.address;

    //       console.log(`${r.city}, ${r.road}, ${r.house_number}`);
    //       const adr =
    //       r.house_number === undefined
    //           ? `${r.city}, ${r.road}`
    //           : r.road === undefined
    //           ? `${r.city}`
    //           : `${r.city}, ${r.road}, ${r.house_number}`;
    //       dispatch(setPosition(adr));
    //     }
    //   );
    // });

    map.addControl(new positon());
  }, [map]);

  return null;
};
