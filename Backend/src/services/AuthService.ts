import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { comparePassword } from "../utils/password.js";
import { SignJWT, jwtVerify } from "jose";
import type { JWTPayload } from "jose";

class AuthService {
    private usuarioRepository = UsuarioRepository;

    async login(email: string, senha: string): Promise<{ accessToken: string; tokenType: "Bearer"; expiresIn: number }> {
        const usuario = await this.usuarioRepository.retrieveByEmail(email);

        if (!usuario || !(await comparePassword(senha, usuario.senha))) {
            throw new Error("Credenciais inválidas.");
        }

        const now = Math.floor(Date.now() / 1000);
        const expiresIn = 60 * 60;
        const accessToken = await new SignJWT({ usuarioId: usuario.id })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setSubject(usuario.id)
            .setIssuer("NuvemBox")
            .setAudience("users")
            .setIssuedAt(now)
            .setExpirationTime(now + expiresIn)
            .sign(this.getSecret());

        return {
            accessToken,
            tokenType: "Bearer",
            expiresIn,
        };
    }

    async verifyToken(token: string): Promise<JWTPayload | null> {
        try {
            const { payload, protectedHeader } = await jwtVerify(token, this.getSecret(), { issuer: "NuvemBox", audience: "users", algorithms: ["HS256"] });
            if (protectedHeader.typ !== "JWT" || typeof payload.sub !== "string" || !payload.sub.trim() || typeof payload.iat !== "number" || typeof payload.exp !== "number") {
                return null;
            }
            return { sub: payload.sub, iat: payload.iat, exp: payload.exp };
        } catch {
            return null;
        }
    }

    private getSecret(): Uint8Array {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET não configurado.");
        return new TextEncoder().encode(secret);
    }
}

export default new AuthService();