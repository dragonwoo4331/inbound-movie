import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { MailService } from './mail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('이미 등록된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const verificationToken = randomBytes(32).toString('hex');

    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      name: registerDto.name,
      emailVerificationToken: verificationToken,
    });

    const savedUser = await this.userRepository.save(user);

    // 이메일 인증 메일 전송
    await this.mailService.sendVerificationEmail(
      savedUser.email,
      verificationToken,
    );

    const { password, emailVerificationToken, ...result } = savedUser;
    return {
      ...result,
      message: '회원가입이 완료되었습니다. 이메일을 확인해주세요.',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('이메일 인증이 필요합니다.');
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

  async verifyEmail(token: string) {
    const user = await this.userRepository.findOne({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new NotFoundException('유효하지 않은 인증 토큰입니다.');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    await this.userRepository.save(user);

    return { message: '이메일 인증이 완료되었습니다.' };
  }

  async resendVerificationEmail(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('이미 인증된 이메일입니다.');
    }

    const verificationToken = randomBytes(32).toString('hex');
    user.emailVerificationToken = verificationToken;
    await this.userRepository.save(user);

    await this.mailService.sendVerificationEmail(user.email, verificationToken);

    return { message: '인증 이메일이 재전송되었습니다.' };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      // 보안을 위해 사용자가 존재하지 않아도 성공 메시지 반환
      return { message: '비밀번호 재설정 이메일이 전송되었습니다.' };
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // 1시간 후 만료

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await this.userRepository.save(user);

    await this.mailService.sendPasswordResetEmail(email, resetToken);

    return { message: '비밀번호 재설정 이메일이 전송되었습니다.' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { passwordResetToken: resetPasswordDto.token },
    });

    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new BadRequestException('유효하지 않거나 만료된 토큰입니다.');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await this.userRepository.save(user);

    return { message: '비밀번호가 재설정되었습니다.' };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const { password, emailVerificationToken, passwordResetToken, ...result } = user;
    return result;
  }
}

