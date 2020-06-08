import React from "react";
import "flag-icon-css/css/flag-icon.css";

const Flag = ({ nationality }) => (
  <span
    className={`flag-icon flag-icon-${nationality}`}
    style={{ display: "inline-block", marginRight: 5 }}
  />
);

export default Flag;
