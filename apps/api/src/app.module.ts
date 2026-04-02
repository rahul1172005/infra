import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { TeamService } from './team/team.service';
import { TeamController } from './team/team.controller';
import { LeaderboardService } from './leaderboard/leaderboard.service';
import { ScoreGateway } from './socket/score.gateway';
import { SubmissionService } from './submission/submission.service';

// Phase 2 / 3 Services
import { AiService } from './ai/ai.service';
import { BattleService } from './battle/battle.service';
import { PaymentService } from './payment/payment.service';
import { GamificationService } from './gamification/gamification.service';
import { AntiCheatService } from './anticheat/anticheat.service';
import { TournamentService } from './tournament/tournament.service';
import { JudgeService } from './judge/judge.service';
import { MatchmakingService } from './matchmaking/matchmaking.service';
import { CtfService } from './ctf/ctf.service';
import { PrismaModule } from './prisma/prisma.module';
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { AuthController } from './auth/auth.controller';
import { LeaderboardController } from './leaderboard/leaderboard.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Module({
    imports: [
        PrismaModule,
        ScoreboardModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'zapsters_super_secret_jwt',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [TeamController, AuthController, LeaderboardController],
    providers: [
        AuthService,
        JwtAuthGuard,
        RolesGuard,
        TeamService,
        LeaderboardService,
        ScoreGateway,
        SubmissionService,

        AiService,
        BattleService,
        PaymentService,
        GamificationService,
        AntiCheatService,
        TournamentService,
        JudgeService,
        MatchmakingService,
        CtfService
    ],
})
export class AppModule { }
