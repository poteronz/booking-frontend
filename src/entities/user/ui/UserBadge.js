import React from "react";

// бейдж с именем пользователя (показываем в шапке)
function UserBadge(props) {
  return (
    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
      {props.user.name}
    </span>
  );
}

export { UserBadge };
