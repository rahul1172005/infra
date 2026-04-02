import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) {}

    @Get('teams')
    async getTeamLeaderboard() {
        return this.leaderboardService.getTeamLeaderboard();
    }

    @Get('players')
    async getPlayerLeaderboard() {
        return this.leaderboardService.getPlayerLeaderboard();
    }
}
