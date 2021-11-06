import styles from './Loader.module.css';
export default function Loader() {
  return <div className={styles.center}>
    <img src="/assets/images/loader.gif" alt="" />
  </div>
}
