import { UserDto } from "../../../../mserver/src/dto/user.dto";

export * from "../../../../mserver/src/dto/user.dto";

export interface AuthState {
  isRequestInProgress: boolean;
  authenticated: boolean;
  user?: UserDto;
  expiresAt?: number;
  error?: string;
}