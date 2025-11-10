import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // 실제 SMTP 설정 (Gmail 등) 또는 Ethereal.email 테스트 설정
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

  async sendVerificationEmail(email: string, token: string) {
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
      // console.log('Verification email sent:', info.messageId);
      // console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      // 이메일 전송 실패 시에도 사용자 등록은 성공하도록 함
      // 실제 운영 환경에서는 적절한 로깅과 모니터링 필요
      return null;
    }
  }

  async sendPasswordResetEmail(email: string, token: string) {
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
      // console.log('Password reset email sent:', info.messageId);
      // console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

