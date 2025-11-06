import { create } from 'zustand';
import {persist} from 'zustand/middleware';

interface LoginState {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const loginStore = create(
  persist<LoginState>(
    (set) => ({
      isLoggedIn: false,
      login: () => {
        const userLocalStorage = localStorage.getItem('userId');
        if (userLocalStorage) {
          set({ isLoggedIn: true });
        } else {
          set({ isLoggedIn: false });
        }
      },
      logout: () => {
        localStorage.removeItem('userId');
        set({ isLoggedIn: false });
      },
    }),
    {
      name: 'login-store',
    }
  )
);

export const useLoginStore = loginStore;