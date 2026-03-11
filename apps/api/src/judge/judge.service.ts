import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { ScoreGateway } from '../socket/score.gateway';

@Injectable()
export class JudgeService {
    private readonly logger = new Logger(JudgeService.name);

    // Mocks proxying to a Judge0 microservice cluster (DMOJ / Judge0 Architecture)
    constructor(
        private prisma: PrismaService,
        private leaderboard: LeaderboardService,
        private socket: ScoreGateway
    ) { }

    /**
     * Receives submitted source code, generates execution log queue
     * in production this POSTs to judge0 /submissions endpoint.
     */
    async submitCodeExecution(userId: string, languageId: number, sourceCode: string, stdin: string, expectedOut: string) {
        // 1. Queue it in DB
        const execLog = await this.prisma.codeExecutionLog.create({
            data: {
                submissionId: 'TEMP_SUB_ID',
                userId,
                languageId,
                sourceCode,
                stdin,
                expectedOut,
                status: 'QUEUED'
            }
        });

        // 2. Fire and Forget (simulate judge execution time)
        setTimeout(() => this.processExecution(execLog), 2000);

        return { token: execLog.id, status: 'QUEUED' };
    }

    // Simulating Judge0 webhook callback / polling mechanism
    private async processExecution(execLog: any) {
        this.logger.log(`Evaluating code token: ${execLog.id}`);

        // Naive evaluation mock just for foundational layout
        const isCorrect = execLog.sourceCode.includes('print');
        const finalStatus = isCorrect ? 'ACCEPTED' : 'WRONG_ANSWER';
        const pointsGained = isCorrect ? 50 : 0;

        const result = await this.prisma.codeExecutionLog.update({
            where: { id: execLog.id },
            data: {
                status: finalStatus,
                time: 0.1,
                memory: 1024,
                stdout: isCorrect ? execLog.expectedOut : 'Error: missing output',
            }
        });

        // Award Points
        if (isCorrect) {
            const user = await this.prisma.user.findUnique({ where: { id: execLog.userId } });
            if (user?.teamId) {
                await this.leaderboard.updateScore(user.teamId, pointsGained);
                await this.socket.broadcastLeaderboard();
            }
        }

        this.socket.server.emit(`judge_update_${execLog.id}`, result);
    }
}
