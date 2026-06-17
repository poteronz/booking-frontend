import React from "react";
import { UserBadge } from "../../entities/user";
import { Button } from "../../shared/ui/Button";

// шапка сайта
function Header(props) {
  return (
    <header style={{ backgroundColor: "#2563eb", color: "white", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>BookIt</h1>

      <nav style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "14px",
            border: "none",
            cursor: "pointer",
            fontWeight: props.page === "home" ? "bold" : "normal",
            backgroundColor: props.page === "home" ? "white" : "rgba(255,255,255,0.2)",
            color: props.page === "home" ? "#2563eb" : "white"
          }}
          onClick={function () { props.onNavigate("home"); }}
        >
          Услуги
        </button>
        <button
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "14px",
            border: "none",
            cursor: "pointer",
            fontWeight: props.page === "profile" ? "bold" : "normal",
            backgroundColor: props.page === "profile" ? "white" : "rgba(255,255,255,0.2)",
            color: props.page === "profile" ? "#2563eb" : "white"
          }}
          onClick={function () { props.onNavigate("profile"); }}
        >
          Мои записи
        </button>

        {props.user && <UserBadge user={props.user} />}

        <Button
          variant="secondary"
          onClick={props.onLogout}
        >
          Выйти
        </Button>
      </nav>
    </header>
  );
}

export { Header };
