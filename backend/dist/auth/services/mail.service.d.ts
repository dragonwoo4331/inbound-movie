import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendVerificationEmail(email: string, token: string): Promise<any>;
    sendPasswordResetEmail(email: string, token: string): Promise<any>;
}
