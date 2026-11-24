import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { comparePassword } from "../utils/password.js";
import { SignJWT, jwtVerify } from "jose";

interface AuthPayload {
  sub: string;
  iat: number;
  exp: number;
}

interface LoginResponse {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
}

class AuthService {
  private usuarioRepository = UsuarioRepository;
  private readonly issuer = "NuvemBox";
  private readonly audience = "users";
  private readonly expiresIn = 60 * 60;

  private readonly secret: Uint8Array;

  constructor() {
    this.secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (!this.secret || this.secret.length === 0) {
      throw new Error("JWT_SECRET não definido.");
    }

    if (this.secret.byteLength < 32) {
      throw new Error("JWT_SECRET deve possuir pelo menos 32 bytes.");
    }
  }

  async login(email: string, senha: string): Promise<LoginResponse> {
    const usuario = await this.usuarioRepository.retrieveByEmail(
      email.trim().toLowerCase(),
    );

    if (!usuario || !(await comparePassword(senha, usuario.senha))) {
      throw new Error("Credenciais inválidas.");
    }

    const now = Math.floor(Date.now() / 1000);

    const accessToken = await new SignJWT({ userId: usuario.id })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setSubject(usuario.id)
      .setIssuer(this.issuer)
      .setAudience(this.audience)
      .setIssuedAt(now)
      .setExpirationTime(now + this.expiresIn)
      .sign(this.secret);

    return {
      accessToken,
      tokenType: "Bearer",
      expiresIn: this.expiresIn,
    };
  }

  async verifyToken(token: string): Promise<AuthPayload | null> {
    try {
      const { payload, protectedHeader } = await jwtVerify(token, this.secret, {
        issuer: this.issuer,
        audience: this.audience,
        algorithms: ["HS256"],
      });

      const now = Math.floor(Date.now() / 1000);

      if (
        protectedHeader.typ !== "JWT" ||
        typeof payload.sub !== "string" ||
        !payload.sub.trim() ||
        typeof payload.iat !== "number" ||
        typeof payload.exp !== "number" ||
        payload.iat > now ||
        payload.exp <= payload.iat
      ) {
        return null;
      }

      return {
        sub: payload.sub,
        iat: payload.iat,
        exp: payload.exp,
      };
    } catch {
      return null;
    }
  }
}

export default new AuthService();
