import { Favorite } from '../../favorites/entities/favorite.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    isEmailVerified: boolean;
    emailVerificationToken: string | null;
    passwordResetToken: string | null;
    passwordResetExpires: Date | null;
    favorites: Favorite[];
    createdAt: Date;
    updatedAt: Date;
}
