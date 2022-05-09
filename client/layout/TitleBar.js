import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
const TitleBar = () => {
  const route = useRouter();
  return (
    <div className="mb-3">
      <div>
        <p
          className={`float-lg-end text-warning fs-light me-5  ${styles.title}`}
        >
          Thinkschool <a href="https://nextjs.org">Admission Portal!</a>
        </p>

        <div className=" col-md-12">
          <nav aria-label="breadcrumb  ">
            <ol className="breadcrumb ps-5">
              <li className="breadcrumb-item">
                <a href="#" className="text-warning">
                  Home
                </a>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                {route.pathname === "/" ? "Dashboard" : route.pathname.slice(1)}
              </li>
            </ol>
          </nav>
          {/* <div className=" col btn-group float-end">
            <button
              type="button"
              className="btn btn-warning rounded-pill dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              MENUE
            </button>

            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
