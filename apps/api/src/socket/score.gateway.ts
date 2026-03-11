import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ScoreGateway {
    @WebSocketServer()
    server: Server;

    constructor(private leaderboardService: LeaderboardService) { }

    async broadcastLeaderboard() {
        const top = await this.leaderboardService.getTopTeams();
        this.server.emit('leaderboardUpdate', top);
    }
}
