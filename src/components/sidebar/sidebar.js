import { useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, getData } from '../../store/dataSlice';
import { addForm, setForm } from '../../store/formSlice';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { openSidebar } from '../../store/stateSidebarSlice';
import { showButtonAdd } from '../../store/stateButtonAddSlice';

export default function Sidebar({ address }) {
  const data = useSelector((state) => state.data.data);
  const form = useSelector((state) => state.form.form);
  const forms = useSelector((state) => state.form.forms);
  const markers = useSelector((state) => state.marker.markers);
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const dispatch = useDispatch();
  const title = useSelector((state) => state.form.form.title);
  const description = useSelector((state) => state.form.form.description);
  //const showButtonAdd = useSelector((state) => state.addButton.showButton);

  const onChange = (e) => {
    dispatch(setForm({ [e.target.name]: e.target.value }));
  };

  const addMarker = (e) => {
    e.preventDefault();

    if (
      (markers.length - 1 === forms.length && form.title !== '') &&
      form.description !== ''
    ) {
      dispatch(addForm(form));
      dispatch(openSidebar(false));
      dispatch(showButtonAdd(true))
      dispatch(setForm({ title: '', description: '' }));
    
    }
  };

  console.log(markers);
  console.log(forms);

  return (
    <div className={styles.sidebar}>
      <h2>Выберете адрес на карте</h2>
      <p>Адрес: {address ? address : 'Не выбран'}</p>

      <select
        defaultValue='none'
        name='title'
        onChange={onChange}
        value={form.title}
        className={styles.input}
      >
        <option disabled={true} value=''>
          Заголовок
        </option>
        {data &&
          data.reference.titles.map((item, i) => {
            return <option key={i}>{item.name}</option>;
          })}
      </select>

      <select
        defaultValue='none'
        name='description'
        onChange={onChange}
        value={form.description}
        className={styles.input}
      >
        <option disabled={true} value=''>
          Описание
        </option>
        {data &&
          data.reference.descriptions.map((item, i) => {
            return <option key={i}>{item.name}</option>;
          })}
      </select>

      <button onClick={addMarker}>Добавить</button>
    </div>
  );
}
