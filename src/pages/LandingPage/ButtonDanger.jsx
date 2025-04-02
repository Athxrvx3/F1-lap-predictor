import React from "react";
import "./style.css"; // If you need styling

const ButtonDanger = ({ className, divClassName, label, size, variant }) => {
  return (
    <button className={`${className} ${size} ${variant}`}>
      {label}
    </button>
  );
};

export default ButtonDanger;