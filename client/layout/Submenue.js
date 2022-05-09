import { useState } from "react";
const Submenue = ({ children }) => {
  const [drop, setDrop] = useState(false);

  const toggleDrop = () => setDrop(!drop);

  return (
    <li className="nav-tree" onClick={toggleDrop}>
      CBT
          <ul style={{ display: drop ? 'block' : 'none' }}>
              <li></li>
              {children}
          </ul>
      {!drop ? (
        <i className="bi bi-chevron-right"></i>
      ) : (
        <i classNamme="bi bi-chevron-down"></i>
      )}
    </li>
  );
};

export default Submenue;
