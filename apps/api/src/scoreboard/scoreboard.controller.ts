import { Controller, Get, Post, Body, Query, UseGuards, Param, Delete } from '@nestjs/common';
import { ScoreboardService } from './scoreboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('scoreboard')
@UseGuards(JwtAuthGuard)
export class ScoreboardController {
    constructor(private readonly scoreboardService: ScoreboardService) {}

    /**
     * API: Global User Leaderboard
     * Pagination support for high user volume
     */
    @Get('users')
    async getUsers(@Query('limit') limit = 100, @Query('page') page = 1) {
        return this.scoreboardService.getUserLeaderboard(Number(limit), Number(page));
    }

    /**
     * API: Global Team Leaderboard
     */
    @Get('teams')
    async getTeams(@Query('limit') limit = 20) {
        return this.scoreboardService.getTeamLeaderboard(Number(limit));
    }

    /**
     * API: Add Score (Admin only in production)
     * Triggers the atomic transaction for SSOT
     */
    @Post('adjust')
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    async addScore(
        @Body('userId') userId: string,
        @Body('points') points: number,
        @Body('reason') reason: string
    ) {
        return this.scoreboardService.addScore(userId, Number(points), reason);
    }

    /**
     * API: Reset Global Season
     * Requires Admin privileges and has immediate effect on all accounts
     */
    @Delete('reset-season')
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    async resetSeason() {
        return this.scoreboardService.resetSeason();
    }
}
