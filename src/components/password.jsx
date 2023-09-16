import React, { useState } from "react";
import style from "../styles/passwordBox.module.css";

export default function TogglePassword(props) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleAnimation = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        className={style.actionBtn}
        onClick={() => {
          const passwordBox = document.getElementById(props.record);
          if (passwordBox.value.length === 4) {
            props.deleteRecord(props.record, passwordBox.value);
          } else {
            toggleAnimation();
          }
        }}
      >
        Delete
      </button>
      <input
        id={props.record}
        type="password"
        className={`${style.passwordBox} ${
          isVisible ? style.visible : style.hidden
        }`}
        maxLength={4}
      />
    </div>
  );
}
