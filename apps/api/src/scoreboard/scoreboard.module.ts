import { Module } from '@nestjs/common';
import { ScoreboardService } from './scoreboard.service';
import { ScoreboardController } from './scoreboard.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'zapsters_super_secret_jwt',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [ScoreboardController],
    providers: [ScoreboardService, JwtAuthGuard, RolesGuard],
    exports: [ScoreboardService]
})
export class ScoreboardModule {}
