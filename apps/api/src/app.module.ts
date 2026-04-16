import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { TeamService } from './team/team.service';
import { TeamController } from './team/team.controller';
import { SubmissionController } from './submission/submission.controller';
import { LeaderboardService } from './leaderboard/leaderboard.service';
import { ScoreGateway } from './socket/score.gateway';
import { MonitoringGateway } from './socket/monitoring.gateway';
import { SubmissionService } from './submission/submission.service';

// Phase 2 / 3 Services
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
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { LeaderboardController } from './leaderboard/leaderboard.controller';
import { AuditModule } from './audit/audit.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        ScoreboardModule,
        NotificationModule,
        AuditModule,
    ],
    controllers: [TeamController, AuthController, LeaderboardController, SubmissionController],
    providers: [
        TeamService,
        LeaderboardService,
        ScoreGateway,
        MonitoringGateway,
        SubmissionService,

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
