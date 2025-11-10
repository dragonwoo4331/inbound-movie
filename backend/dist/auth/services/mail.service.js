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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let MailService = class MailService {
    configService;
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST', 'smtp.ethereal.email'),
            port: parseInt(this.configService.get('SMTP_PORT', '587')),
            secure: this.configService.get('SMTP_SECURE', 'false') === 'true',
            auth: {
                user: this.configService.get('SMTP_USER', 'test@ethereal.email'),
                pass: this.configService.get('SMTP_PASS', 'test-password'),
            },
        });
    }
    async sendVerificationEmail(email, token) {
        const verificationUrl = `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/auth/verify-email?token=${token}`;
        const mailOptions = {
            from: this.configService.get('SMTP_FROM', 'noreply@movieapp.com'),
            to: email,
            subject: '이메일 인증',
            html: `
        <h2>이메일 인증</h2>
        <p>아래 링크를 클릭하여 이메일을 인증하세요:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>이 링크는 24시간 동안 유효합니다.</p>
      `,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            return info;
        }
        catch (error) {
            console.error('Error sending email:', error);
            return null;
        }
    }
    async sendPasswordResetEmail(email, token) {
        const resetUrl = `${this.configService.get('FRONTEND_URL', 'http://localhost:3000')}/auth/reset-password?token=${token}`;
        const mailOptions = {
            from: this.configService.get('SMTP_FROM', 'noreply@movieapp.com'),
            to: email,
            subject: '비밀번호 재설정',
            html: `
        <h2>비밀번호 재설정</h2>
        <p>아래 링크를 클릭하여 비밀번호를 재설정하세요:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>이 링크는 1시간 동안 유효합니다.</p>
        <p>만약 비밀번호 재설정을 요청하지 않으셨다면, 이 이메일을 무시하세요.</p>
      `,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            return info;
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map