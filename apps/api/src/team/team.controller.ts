import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Get()
    async getTeams() {
        return this.teamService.getTeams();
    }

    @Post()
    async createTeam(@Body() body: { name: string }) {
        return this.teamService.createTeam(body.name);
    }

    @Delete(':id')
    async deleteTeam(@Param('id') id: string) {
        return this.teamService.deleteTeam(id);
    }

    @Patch(':id/points')
    async updatePoints(@Param('id') id: string, @Body() body: { points: number }) {
        return this.teamService.updatePoints(id, body.points);
    }
}
