import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../Map.css';
import { useMap } from 'react-leaflet/hooks';
import L from 'leaflet';
import { setPosition } from '../../store/addressSlice';

export const GetCoordinates = () => {
  const geocoder = L.Control.Geocoder?.nominatim();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
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
    //   geocoder?.reverse(
    //     e.latlng,
    //     map.options.crs.scale(map.getZoom()),
    //     (results) => {
    //       const r = results[0]?.properties.address;
пше фвв
    //       const address =
    //         r.house_number === undefined
    //           ? `${r.city}, ${r.road}`
    //           : r.road === undefined
    //           ? `${r.city}`
    //           : `${r.city}, ${r.road}, ${r.house_number}`;
    //       if (showSidebar) {
    //         dispatch(setPosition(address));
    //       }
    //     }
    //   );
    // });

    map.addControl(new positon());
  }, [map, showSidebar, dispatch, geocoder]);

  return null;
};
