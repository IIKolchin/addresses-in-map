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

function MapComponent() {
  const address = useSelector((state) => state.address.address);
  const title = useSelector((state) => state.form.form.title);
  const description = useSelector((state) => state.form.form.description);
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const marker = useRef();
  const forms = useSelector((state) => state.form.forms);
  const buttonAdd = useSelector((state) => state.addButton.showButton);

  const dispatch = useDispatch();
  //   const [position, setPosition] = useState(null);
  //   const [showSidebar, setShowSidebar] = useState(false);
  const geocoder = L.Control.Geocoder.nominatim();
  //   const [address, setAdress] = useState();

  useEffect(() => {
    dispatch(getMarker(marker.current));
  }, []);
  // console.log(address)
  // console.log(geocoder)
  const onClick = () => {
    dispatch(openSidebar(true));
    dispatch(showButtonAdd(false));
  };

  //   const GetCoordinates = () => {
  //     const map = useMap();

  //     useEffect(() => {
  //       if (!map) return;
  //       const info = L.DomUtil.create('div', 'legend');

  //       const positon = L.Control.extend({
  //         onAdd: function () {
  //           return info;
  //         },
  //       });

  //         map.on('click', (e) => {
  //         //   info.textContent = e.latlng;
  //           geocoder.reverse(
  //             e.latlng,
  //             map.options.crs.scale(map.getZoom()),
  //             (results) => {
  //               // console.log(results)
  //               const r = results[0].properties.address;
  //               console.log(r);
  //               city = r.city;
  //               street = r.road;
  //               house = r.house_number;
  //               //   setAdress(`${city}, ${street}, ${house}`)
  //               console.log(`${city}, ${street}, ${house}`);
  //               const adr =
  //               r.house_number === undefined
  //                   ? `${city}, ${street}`
  //                   : r.road === undefined
  //                   ? `${city}`
  //                   : `${city}, ${street}, ${house}`;
  //               dispatch(setPosition(adr));
  //             }
  //           );
  //         });

  //       map.addControl(new positon());
  //     }, [map]);

  //     // console.log(position)
  //     return null;
  //   };

  //   console.log(position);
  //   console.log(address);

  //   function LocationMarkers() {
  //     const markers = useSelector((state) => state.marker.markers);

  //     const map = useMapEvents({
  //       click(e) {
  //         if(showSidebar) {
  //             dispatch(setMarker(e.latlng));
  //         }

  //       },
  //     });
  //     // console.log(markers);

  //     return (
  //       <React.Fragment>
  //         {markers.map((position, i) => (
  //           <Marker
  //             ref={marker}
  //             icon={
  //               new Icon({
  //                 iconUrl: markerIconPng,
  //                 iconSize: [25, 41],
  //                 iconAnchor: [12, 41],
  //               })
  //             }
  //             key={i}
  //             position={position}
  //           >

  //                 <Popup >
  //                   <p>{forms[i]?.title}</p>
  //                   <p>{forms[i]?.description}</p>
  //                 </Popup>

  //           </Marker>
  //         ))}
  //       </React.Fragment>
  //     );
  //   }
  //   console.log(markers)
  //   const checkResponse = (res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   };

  //   const postRequest = async (form) => {
  //     const res = await fetch('https://run.mocky.io/v3/6102c1b2-254f-4b7c-addb-67d4df752866', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(form),
  //     });
  //     const data = await checkResponse(res);
  //     return data;
  //   };

  // postRequest(form).then(data => console.log(data))

  return (
    <>
      {showSidebar && <Sidebar address={address} />}
      <MapContainer
        center={{ lat: 55.795, lng: 37.8 }}
        zoom={13}
        scrollWheelZoom={false}
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
