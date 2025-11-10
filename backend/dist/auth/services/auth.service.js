"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("../entities/user.entity");
const mail_service_1 = require("./mail.service");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    mailService;
    constructor(userRepository, jwtService, mailService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async register(registerDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('이미 등록된 이메일입니다.');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const verificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const user = this.userRepository.create({
            email: registerDto.email,
            password: hashedPassword,
            name: registerDto.name,
            emailVerificationToken: verificationToken,
        });
        const savedUser = await this.userRepository.save(user);
        await this.mailService.sendVerificationEmail(savedUser.email, verificationToken);
        const { password, emailVerificationToken, ...result } = savedUser;
        return {
            ...result,
            message: '회원가입이 완료되었습니다. 이메일을 확인해주세요.',
        };
    }
    async login(loginDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        if (!user.isEmailVerified) {
            throw new common_1.UnauthorizedException('이메일 인증이 필요합니다.');
        }
        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async verifyEmail(token) {
        const user = await this.userRepository.findOne({
            where: { emailVerificationToken: token },
        });
        if (!user) {
            throw new common_1.NotFoundException('유효하지 않은 인증 토큰입니다.');
        }
        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        await this.userRepository.save(user);
        return { message: '이메일 인증이 완료되었습니다.' };
    }
    async resendVerificationEmail(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        if (user.isEmailVerified) {
            throw new common_1.BadRequestException('이미 인증된 이메일입니다.');
        }
        const verificationToken = (0, crypto_1.randomBytes)(32).toString('hex');
        user.emailVerificationToken = verificationToken;
        await this.userRepository.save(user);
        await this.mailService.sendVerificationEmail(user.email, verificationToken);
        return { message: '인증 이메일이 재전송되었습니다.' };
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return { message: '비밀번호 재설정 이메일이 전송되었습니다.' };
        }
        const resetToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const resetExpires = new Date();
        resetExpires.setHours(resetExpires.getHours() + 1);
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = resetExpires;
        await this.userRepository.save(user);
        await this.mailService.sendPasswordResetEmail(email, resetToken);
        return { message: '비밀번호 재설정 이메일이 전송되었습니다.' };
    }
    async resetPassword(resetPasswordDto) {
        const user = await this.userRepository.findOne({
            where: { passwordResetToken: resetPasswordDto.token },
        });
        if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
            throw new common_1.BadRequestException('유효하지 않거나 만료된 토큰입니다.');
        }
        const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
        user.password = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await this.userRepository.save(user);
        return { message: '비밀번호가 재설정되었습니다.' };
    }
    async getProfile(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        const { password, emailVerificationToken, passwordResetToken, ...result } = user;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map