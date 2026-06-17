// моковые данные пользователей (заглушка вместо сервера)

var users = [
  { id: 1, name: "Иван", email: "ivan@mail.ru", password: "123456", role: "user" },
  { id: 2, name: "Админ", email: "admin@mail.ru", password: "admin123", role: "admin" },
  { id: 3, name: "Пётр", email: "petr@mail.ru", password: "qwerty", role: "user" }
];

// найти пользователя по email и паролю (для входа)
function loginUser(email, password) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      return users[i];
    }
  }
  return null;
}

// добавить нового пользователя (для регистрации)
function registerUser(name, email, password) {
  // проверяем, нет ли уже такого email
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return null; // уже есть
    }
  }
  var newUser = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
    role: "user"
  };
  users.push(newUser);
  return newUser;
}

export { loginUser, registerUser };
