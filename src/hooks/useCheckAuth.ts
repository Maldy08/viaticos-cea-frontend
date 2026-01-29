import { useAuthStore } from "./useAuthStore";
import type { AuthStatus } from "../types/common/base.types";

export const useCheckAuth = (): AuthStatus | string => {
  const { status } = useAuthStore();
  return status;
};