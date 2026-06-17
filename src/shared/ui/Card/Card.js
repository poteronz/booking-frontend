import React from "react";

// карточка-контейнер с тенью
function Card(props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      {props.children}
    </div>
  );
}

export { Card };
