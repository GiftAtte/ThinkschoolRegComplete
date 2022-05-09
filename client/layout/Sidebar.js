import Link from "next/link";
import { useRouter } from "next/router";
import SideLink from "./SideLink";
import { menueItem, subMenueItem } from "./menuItems";
import Submenue from "./Submenue";

const Sidebar = () => {
  return (
    <div>
      <div
        className="offcanvas offcanvas-start sidebar text-white"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title text-center"
            id="offcanvasWithBothOptionsLabel"
          >
            <center>MENUE</center>
          </h5>
          <button
            type="button"
            className="btn-close btn-warning bg-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul>
            {menueItem.map((item) => (
              <SideLink
                key={item.label}
                label={item.label}
                pathname={item.path}
              />
            ))}
            <Submenue>
              {subMenueItem.map((item) => (
                <SideLink
                  key={item.label}
                  label={item.label}
                  pathname={item.path}
                />
              ))}
            </Submenue>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
