import { Module } from '@nestjs/common';
import { ScoreboardService } from './scoreboard.service';
import { ScoreboardController } from './scoreboard.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule
    ],
    controllers: [ScoreboardController],
    providers: [ScoreboardService],
    exports: [ScoreboardService]
})
export class ScoreboardModule {}
