import styles from "./loader.module.css";

export function Loader() {
  return (
    <div className={styles.loader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
