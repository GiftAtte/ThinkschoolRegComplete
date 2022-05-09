import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <Head>
        <title>Pizza Galery</title>
        <meta name="description" content="best pizza gallery" />
        <link rel="icon" href="/favicon.icon" />
      </Head>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.callbtn}>
            <Image src="/img/telephone.png" alt="" width="40" height="40" />
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>MAKE ORDER</div>
            <div className={styles.text}>08030393838</div>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <li className={styles.listItem}>Home</li>
            <li className={styles.listItem}>AboutUs</li>
            <li className={styles.listItem}>Contact</li>
            <li>
              <Image src="/img/logo.png" width="100" height="60" alt="" />
            </li>
            <li className={styles.listItem}>Products</li>
            <li className={styles.listItem}>Orders</li>
          </ul>
        </div>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" height="40" width="40" alt="" />
            <div className={styles.counter}>3</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
