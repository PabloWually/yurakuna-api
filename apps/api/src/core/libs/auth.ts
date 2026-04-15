import { Login } from "@core/auth/application/login";
import { Logout } from "@core/auth/application/logout";
import { RefreshAccessToken } from "@core/auth/application/refreshAccessToken";
import { RefreshTokenRepository } from "@core/auth/infrastructure/refreshTokenDrizzleRespository";
import { UserDrizzleRepository } from "@core/user/infrastructure/userDrizzleRepository";
import { getDatabase } from "@database/connection";

export const authManager = {
  get login() {
    const db = getDatabase();
    return new Login(new UserDrizzleRepository(db), new RefreshTokenRepository(db));
  },
  get logout() {
    const db = getDatabase();
    return new Logout(new RefreshTokenRepository(db));
  },
  get refreshAccessToken() {
    const db = getDatabase();
    return new RefreshAccessToken(new UserDrizzleRepository(db), new RefreshTokenRepository(db));
  },
}
