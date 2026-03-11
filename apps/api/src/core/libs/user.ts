import { RefreshTokenRepository } from "@core/auth/infrastructure/refreshTokenDrizzleRespository";
import { RegisterUser } from "@core/user/application/registerUser";
import { UserDrizzleRepository } from "@core/user/infrastructure/userDrizzleRepository";
import { db } from "@database/connection";

export const userManager = {
  registerUser: new RegisterUser(new UserDrizzleRepository(db), new RefreshTokenRepository(db)),
}
