import { useSelector, useDispatch } from "react-redux";
import { onCheckUserById, onCheking, onAuthError, onLogin, onLogout } from "../store/auth/authSlice";
import { onResetEmpleadosState } from "../store/empleados/empleadosSlice";
import { onResetUiState } from "../store/ui/uiSlice";
import type { RootState } from '../types/store/store.types';
import type { LoginCredentials } from '../types/auth/auth.types';
import type { ID } from '../types/common/base.types';
import { authRepository } from '../services/repositories';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (login: string, pass: string, ejercicio: number): Promise<void> => {
    dispatch(onCheking());
    
    try {
      const credentials: LoginCredentials = { login, password: pass, ejercicio };
      const data = await authRepository.login(credentials);

      localStorage.setItem('ejercicio', ejercicio.toString());
      localStorage.setItem('token', data.token);
      localStorage.setItem("data", JSON.stringify(data));
      dispatch(onLogin({ user: data }));

    } catch (error) {
      console.log({ error });
      dispatch(onAuthError());
    }
  };

  const checkAuthToken = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(onLogout());
      return;
    }

    dispatch(onCheking());
    try {
      const data = await authRepository.validateToken(token);
      dispatch(onLogin({ user: data }));
      
    } catch (error) {
      localStorage.clear();
      console.log({ error });
      dispatch(onLogout());
    }
  };

  const startLogOut = (): void => {
    localStorage.clear();
    dispatch(onCheking());
    dispatch(onResetUiState());
    dispatch(onResetEmpleadosState());
    dispatch(onLogout());
  };

  const startCheckingUserById = async (id: ID): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(onLogout());
      return;
    }

    try {
      const data = await authRepository.getUserById(id);
      dispatch(onCheckUserById({ user: data }));
      
    } catch (error) {
      localStorage.clear();
      console.log({ error });
    }
  };

  const startUpdatePassword = async (userId: string, newpassword: string): Promise<any> => {
    try {
      const data = await authRepository.changePassword(userId, newpassword);
      console.log({ data });
      return data;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  return {
    // Propiedades
    errorMessage,
    status,
    user,
    // Métodos
    startLogin,
    startLogOut,
    checkAuthToken,
    startCheckingUserById,
    startUpdatePassword,
  };
};