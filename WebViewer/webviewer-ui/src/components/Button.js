import React from "react";
import classnames from "classnames";

export default function Button({ className, clickedButton, children }) {
  return (
    <div
      className={classnames("p-2 rounded border", className)}
      onClick={clickedButton}
    >
      {children}
    </div>
  );
}
