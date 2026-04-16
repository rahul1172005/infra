import { Controller, Get, Post, Delete, Param, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { TeamService } from './team.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@zapsters/database';
import { TeamOwnerGuard } from '../auth/team-owner.guard';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Get()
    async getTeams() {
        return this.teamService.getTeams();
    }

    @Get('admin/detailed')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async getTeamsDetailed() {
        return this.teamService.getTeamsDetailed();
    }

    @Get(':id')
    async getTeamById(@Param('id') id: string) {
        return this.teamService.getTeamById(id);
    }

    @Post()
    async createTeam(@Body() body: { name: string; image?: string; maxMembers?: number }, @Req() req: any) {
        return this.teamService.createTeamOfPlayer(req.user.sub, body.name, body.image, body.maxMembers);
    }

    @Patch(':id')
    @UseGuards(TeamOwnerGuard)
    async updateTeam(
        @Param('id') id: string, 
        @Body() body: { name?: string; image?: string; maxMembers?: number }, 
        @Req() req: any
    ) {
        return this.teamService.updateTeamProfile(id, req.user.sub, req.user.role, body);
    }

    @Delete(':id')
    @UseGuards(TeamOwnerGuard)
    async deleteTeam(@Param('id') id: string, @Req() req: any) {
        return this.teamService.deleteTeam(id, req.user.sub, req.user.role);
    }

    @Post(':id/request-join')
    async requestToJoin(@Param('id') id: string, @Req() req: any) {
        return this.teamService.requestToJoin(id, req.user.sub);
    }

    @Get(':id/join-requests')
    async getJoinRequests(@Param('id') id: string, @Req() req: any) {
        return this.teamService.getJoinRequestsForTeam(id, req.user.sub);
    }

    @Post('requests/:requestId/respond')
    async respondToJoinRequest(
        @Param('requestId') requestId: string,
        @Body() body: { accept: boolean },
        @Req() req: any
    ) {
        return this.teamService.respondToJoinRequest(requestId, req.user.sub, body.accept);
    }

    @Post(':id/join')
    async joinTeam(@Param('id') id: string, @Req() req: any) {
        return this.teamService.joinTeam(id, req.user.sub);
    }

    @Post(':id/leave')
    async leaveTeam(@Param('id') id: string, @Req() req: any) {
        return this.teamService.leaveTeam(id, req.user.sub);
    }

    // Admin Battle Score Controls
    @Patch(':id/score/adjust')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async adjustScore(@Param('id') id: string, @Body() body: { amount: number }) {
        return this.teamService.adjustScore(id, body.amount);
    }

    @Patch(':id/score/set')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async setScore(@Param('id') id: string, @Body() body: { score: number }) {
        return this.teamService.setScore(id, body.score);
    }

    @Post(':id/score/reset')
    @Roles(UserRole.ADMIN)
    @UseGuards(RolesGuard)
    async resetScore(@Param('id') id: string) {
        return this.teamService.resetScore(id);
    }
}
