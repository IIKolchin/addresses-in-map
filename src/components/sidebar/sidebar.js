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

  useEffect(() => {}, [dispatch]);

  const addMarker = (e) => {
    e.preventDefault();

    if (
      markers.length - 1 === forms.length &&
      form.title !== '' &&
      form.description !== ''
    ) {
      dispatch(addForm(form));

      dispatch(openSidebar(false));
      dispatch(showButtonAdd(true));
      dispatch(setForm({ title: '', description: '' }));
      //   localStorage.setItem('form', JSON.stringify(forms))
    }
  };

  console.log(markers);
  localStorage.setItem('markers', JSON.stringify(markers));
  console.log(forms);
  //   localStorage.setItem('form', JSON.stringify(forms))

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.heading}>Выберете адрес на карте</h2>
      <p className={styles.address}>Адрес: {address ? address : 'Не выбран'}</p>

      <select
        name='title'
        onChange={onChange}
        value={form.title}
        className={styles.select}
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
        name='description'
        onChange={onChange}
        value={form.description}
        className={styles.select}
      >
        <option disabled={true} value=''>
          Описание
        </option>
        {data &&
          data.reference.descriptions.map((item, i) => {
            return <option key={i}>{item.name}</option>;
          })}
      </select>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={addMarker}>
          Добавить
        </button>
      </div>
    </div>
  );
}
