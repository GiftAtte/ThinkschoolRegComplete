import React from "react";

export const Progressbar = ({ progress }) => {
  return (
    <div class="progress">
      <div
        className="progress-bar progress-bar-striped bg-success"
        style={{ width: progress }}
      >
        {" "}
        {progress}{" "}
      </div>
    </div>
  );
};
export default Progressbar;
