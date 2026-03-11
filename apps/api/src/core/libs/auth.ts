import { Login } from "@core/auth/application/login";
import { Logout } from "@core/auth/application/logout";
import { RefreshAccessToken } from "@core/auth/application/refreshAccessToken";
import { RefreshTokenRepository } from "@core/auth/infrastructure/refreshTokenDrizzleRespository";
import { UserDrizzleRepository } from "@core/user/infrastructure/userDrizzleRepository";
import { db } from "@database/connection";

export const authManager = {
  login: new Login(new UserDrizzleRepository(db), new RefreshTokenRepository(db)),
  logout: new Logout(new RefreshTokenRepository(db)),
  refreshAccessToken: new RefreshAccessToken(new UserDrizzleRepository(db), new RefreshTokenRepository(db)),
}
