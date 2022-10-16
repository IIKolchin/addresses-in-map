import { useEffect } from 'react';
import { useAppDispatch, useSelector } from '../../store/index';
import '../../Map.css';
// @ts-ignore
import { useMap } from 'react-leaflet/hooks';
import L from 'leaflet';
import { setPosition } from '../../store/addressSlice';
import { IAddress, IMarker } from '../../services/types';
import {Geocoder, geocoders} from 'leaflet-control-geocoder';

export const GetCoordinates = () => {
  // @ts-ignore
  const geocoder = L.Control.Geocoder.nominatim();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const dispatch = useAppDispatch();
  const map = useMap();

  new Geocoder({
    geocoder: new geocoders.Nominatim(),
  })

  useEffect(() => {
    if (!map) return;
    const info = L.DomUtil.create('div', 'legend');
    const positon = L.Control.extend({
      onAdd: function () {
        return info;
      },
    });

    map.on('click', (e: { latlng: IMarker; }) => {
      geocoder?.reverse(
        e.latlng,
        map.options.crs.scale(map.getZoom()),
        (results: { properties: { address: IAddress; }; }[]) => {
          const r = results[0]?.properties.address;

          const address =
            r.house_number === undefined
              ? `${r.city}, ${r.road}`
              : r.road === undefined
              ? `${r.city}`
              : `${r.city}, ${r.road}, ${r.house_number}`;
          if (showSidebar) {
            dispatch(setPosition(address));
          }
        }
      );
    });

    map.addControl(new positon());
  }, [map, showSidebar, dispatch, geocoder]);

  return null;
};
