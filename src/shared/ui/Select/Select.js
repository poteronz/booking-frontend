import React from "react";

// выпадающий список
function Select(props) {
  return (
    <select
      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white"
      value={props.value}
      onChange={props.onChange}
    >
      {props.children}
    </select>
  );
}

export { Select };
