// логика авторизации — тут используем Zustand стор из app
// этот файл просто содержит функции для входа и регистрации

import { loginUser, registerUser } from "../../../entities/user";

// попробовать войти
function tryLogin(email, password) {
  var user = loginUser(email, password);
  return user; // вернёт null если не нашли
}

// попробовать зарегистрироваться
function tryRegister(name, email, password) {
  var user = registerUser(name, email, password);
  return user; // вернёт null если email занят
}

export { tryLogin, tryRegister };
