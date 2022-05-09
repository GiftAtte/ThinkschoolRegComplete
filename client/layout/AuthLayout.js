import styles from '../styles/Home.module.css'



const AuthLayout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
};

export default AuthLayout;

 
