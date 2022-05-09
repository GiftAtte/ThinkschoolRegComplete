import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";

 
const SideLink = ({ pathname, label }) => {
    const router = useRouter();
    const isActive = (path) => (router.pathname == path ? "active-route" : "");
  return (
    <li
      className={`fw-light fs-6 sidebar-link ${isActive(pathname)}`}
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasWithBothOptions"
    >
      <Link href={pathname}>{label}</Link>
     
    </li>
  );
}

export default SideLink