import React, { useState } from "react";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { tryLogin, tryRegister } from "../model/useAuth";

// форма входа и регистрации
function LoginForm(props) {
  var [isLogin, setIsLogin] = useState(true); // true = вход, false = регистрация
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // пробуем войти
      var user = tryLogin(email, password);
      if (user === null) {
        setError("Неверный email или пароль");
        return;
      }
      props.onLogin(user);
    } else {
      // пробуем зарегистрироваться
      if (name === "") {
        setError("Введите имя");
        return;
      }
      var newUser = tryRegister(name, email, password);
      if (newUser === null) {
        setError("Такой email уже занят");
        return;
      }
      props.onLogin(newUser);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Вход" : "Регистрация"}
      </h2>

      {error !== "" && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {!isLogin && (
          <Input
            placeholder="Имя"
            value={name}
            onChange={function (e) { setName(e.target.value); }}
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={function (e) { setEmail(e.target.value); }}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={function (e) { setPassword(e.target.value); }}
        />
        <Button type="submit">
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
        <button
          className="text-blue-600 underline"
          onClick={function () { setIsLogin(!isLogin); setError(""); }}
        >
          {isLogin ? "Регистрация" : "Вход"}
        </button>
      </p>
    </div>
  );
}

export { LoginForm };
