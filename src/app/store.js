import { create } from "zustand";

// zustand хранилище для текущего пользователя
// create создаёт стор, set — функция для обновления
var useUserStore = create(function (set) {
  return {
    currentUser: null, // пользователь который залогинился

    // сохранить пользователя в стор
    setUser: function (user) {
      set({ currentUser: user });
    },

    // выход - очищаем пользователя
    logout: function () {
      set({ currentUser: null });
    }
  };
});

export { useUserStore };
