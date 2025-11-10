import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { MailService } from './mail.service';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private mailService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, mailService: MailService);
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
    resendVerificationEmail(userId: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<{
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
