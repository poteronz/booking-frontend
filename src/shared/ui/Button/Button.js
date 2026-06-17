import React from "react";

// кнопка с вариантами: primary, danger, success, secondary
function Button(props) {
  var base = "px-4 py-2 rounded-lg font-medium text-sm cursor-pointer";

  var colors = "bg-blue-600 text-white hover:bg-blue-700";
  if (props.variant === "danger") {
    colors = "bg-red-500 text-white hover:bg-red-600";
  }
  if (props.variant === "success") {
    colors = "bg-green-600 text-white hover:bg-green-700";
  }
  if (props.variant === "secondary") {
    colors = "bg-gray-200 text-gray-700 hover:bg-gray-300";
  }

  return (
    <button
      className={base + " " + colors}
      onClick={props.onClick}
      type={props.type || "button"}
    >
      {props.children}
    </button>
  );
}

export { Button };
