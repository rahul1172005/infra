import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { PrismaModule } from '../prisma/prisma.module';
import { TeamOwnerGuard } from './team-owner.guard';

@Global()
@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, JwtAuthGuard, RolesGuard, TeamOwnerGuard],
    exports: [AuthService, JwtModule, JwtAuthGuard, RolesGuard, TeamOwnerGuard],
})
export class AuthModule {}
