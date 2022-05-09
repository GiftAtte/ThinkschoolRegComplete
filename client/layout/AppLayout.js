import styles from '../styles/Home.module.css'
import Image from 'next/image';
import Header from "./Header";
import Menue from './TitleBar';
import Sidebar from './Sidebar';


const AppLayout = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <Sidebar />
      {/* Main container */}
      <div className={styles.container}>
        <main className={styles.main}>
          <Menue />
          <div className="card container col-sm-10">{children}</div>
        </main>
        {/* <Footer /> */}
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thinkschool{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
};

export default AppLayout;
