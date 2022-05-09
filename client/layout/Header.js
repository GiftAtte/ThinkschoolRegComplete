import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <>
      <Head>
        <title>Thinkschoo Registrar</title>
        <meta
          name="description"
          content="Thinkschool admission and cbt portal "
        />
        <link rel="icon" href="/favicon.icon" />
      </Head>
      <div className={` ${styles.container}`}>
        <div className={styles.item}>
          <div className={styles.logo}>
            <p className=" fw-light text-warning fs-1 pointer">
              <i
                className="bi bi-justify-right pointer"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBothOptions"
                aria-controls="offcanvasWithBothOptions"
              ></i>
              TSAP
            </p>
          </div>
        </div>
        <div className={styles.item}>
          <ul>
            <li>
              <a href="#contactme">Logout</a>
            </li>
            <li>
              <a href="#contactme">
                <i className="bi bi-person-circle bi-5x "></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
