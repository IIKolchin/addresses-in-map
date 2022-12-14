import { useEffect } from 'react';
import styles from './sidebar.module.css';
import { useAppDispatch, useSelector } from '../../store/index';
import { addForm, setForm } from '../../store/formSlice';
import { openSidebar } from '../../store/stateSidebarSlice';
import { showButtonAdd } from '../../store/stateButtonAddSlice';
import { removePosition } from '../../store/addressSlice';
import React from 'react';

export default function Sidebar() {
  const data = useSelector((state) => state.data.data);
  const address = useSelector((state) => state.address.address);
  const form = useSelector((state) => state.form.form);
  const forms = useSelector((state) => state.form.forms);
  const markers = useSelector((state) => state.marker.markers);
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setForm({ [e.target.name]: e.target.value }));
  };

  useEffect(() => {}, [dispatch]);

  const addMarker = (e: React.UIEvent<HTMLElement>) => {
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
      dispatch(removePosition(''));
    }
  };
  localStorage.setItem('markers', JSON.stringify(markers));

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
