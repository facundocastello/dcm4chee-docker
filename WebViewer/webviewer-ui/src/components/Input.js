import React from "react";
import classnames from "classnames";

export default function Input({
  className,
  elements,
  name,
  onInputChange,
  title,
  type
}) {
  var renderedInput = "";
  switch (type) {
    case "select":
      renderedInput = (
        <select
          style={style.fixedHeight}
          className="bg-white border rounded w-75"
          onChange={(e) => onInputChange(e,elements)}
          name={name}
          defaultValue={0}
        >
          <option />
          {elements &&
            elements.map((element, index) => (
              <option id={element._id} key={`user-${index}`}>
                {element.name}
              </option>
            ))}
        </select>
      );

      break;
    default:
      renderedInput = (
        <input
          style={style.fixedHeight}
          className="border rounded w-75"
          onChange={onInputChange}
          name={name}
          type={type}
        />
      );
      break;
  }
  return (
    <div
      className={classnames(
        className ? className : "align-items-center d-flex flex-column p-3"
      )}
    >
      {title && <div className="mr-2">{title}</div>}
      <div className="w-100">{renderedInput}</div>
    </div>
  );
}

const style = {
  fixedHeight: {
    height: "30px"
  }
};
