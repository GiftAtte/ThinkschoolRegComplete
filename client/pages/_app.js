import { useRouter } from "next/router";
import { useEffect } from "react";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";
import "../styles/application.scss";
import "../styles/globals.css";



function App({ Component, pageProps }) {
  
const route=useRouter()

  // choose layouts
  const Layout =
    (route.pathname === "/login" ||
    route.pathname === "/signup")?AuthLayout: AppLayout;

  useEffect(() => {

    // Run code on client-side only : ensure document is here
    if (typeof document !== undefined) {
      // load JS bootstrap dependency
      let bootstrap = require("bootstrap/dist/js/bootstrap");

      // find all toasts
      let toastElList = [].slice.call(document.querySelectorAll(".toast"));
      let toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
      });

      // show each toast explicitly
      toastList.forEach(function (element, index) {
        element.show();
      });

      var popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
      );
      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
      });
    }
   console.log(typeof Component)

  }, []);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
