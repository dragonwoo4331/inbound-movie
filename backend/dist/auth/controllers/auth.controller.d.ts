import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        id: string;
        email: string;
        name: string;
        isEmailVerified: boolean;
        passwordResetToken: string | null;
        passwordResetExpires: Date | null;
        favorites: import("../../favorites/entities/favorite.entity").Favorite[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerification(req: any): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        isEmailVerified: boolean;
        passwordResetExpires: Date | null;
        favorites: import("../../favorites/entities/favorite.entity").Favorite[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
