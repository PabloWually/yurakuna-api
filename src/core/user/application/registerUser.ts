import type { IUserRepository } from "@core/user/domain/repositories/IUserRepository";
import { ConflictError, ValidationError } from "@shared/errors";
import type { AuthResponse, RegisterDTO } from "@core/user/domain/DTOs/authDTO";
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiration, hashPassword, type TokenPayload } from "@shared/infrastructure/security/auth";
import type { IRefreshTokenRepository } from "@core/auth/domain/repositories/IRefreshTokenRepository";

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async register(data: RegisterDTO): Promise<AuthResponse> {
    // Validar que el email no exista
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("El email ya está registrado");
    }

    // Validar contraseña
    if (data.password.length < 8) {
      throw new ValidationError(
        "La contraseña debe tener al menos 8 caracteres",
      );
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Crear usuario
    const user = await this.userRepository.create({
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role || "user",
      passwordHash,
    });

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await generateAccessToken(tokenPayload);

    // Crear refresh token
    const refreshTokenValue = await generateRefreshToken({
      userId: user.id,
      tokenId: crypto.randomUUID(),
    });

    const expiresAt = getRefreshTokenExpiration();
    await this.refreshTokenRepository.create(
      user.id,
      refreshTokenValue,
      expiresAt,
    );

    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken: refreshTokenValue,
    };
  }
}
