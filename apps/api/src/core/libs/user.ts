import { RefreshTokenRepository } from "@core/auth/infrastructure/refreshTokenDrizzleRespository";
import { RegisterUser } from "@core/user/application/registerUser";
import { UserDrizzleRepository } from "@core/user/infrastructure/userDrizzleRepository";
import { getDatabase } from "@database/connection";

export const userManager = {
  get registerUser() {
    const db = getDatabase();
    return new RegisterUser(new UserDrizzleRepository(db), new RefreshTokenRepository(db));
  },
}
