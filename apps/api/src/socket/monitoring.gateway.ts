import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class MonitoringGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server!: Server;

    constructor(private prisma: PrismaService) {}

    async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        this.broadcastSystemUpdate();
    }

    async handleDisconnect(client: Socket) {
        const userId = client.data.userId;
        if (userId) {
            await this.prisma.user.update({
                where: { id: userId },
                data: { status: 'IDLE', currentChallengeId: null },
            });
            await this.prisma.activeSession.deleteMany({ where: { userId } });
        }
        this.broadcastSystemUpdate();
    }

    @SubscribeMessage('join_challenge')
    async handleJoinChallenge(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { userId: string; teamId: string; challengeId: string; status: 'CODING' | 'VIEWING' },
    ) {
        client.data.userId = data.userId;
        client.data.teamId = data.teamId;
        
        // Join team room
        client.join(data.teamId);
        // Join challenge room
        client.join(`challenge_${data.challengeId}`);

        await this.prisma.user.update({
            where: { id: data.userId },
            data: { status: data.status, currentChallengeId: data.challengeId, lastActionAt: new Date() },
        });

        await this.prisma.activeSession.upsert({
            where: { userId_challengeId: { userId: data.userId, challengeId: data.challengeId } },
            update: { status: data.status, updatedAt: new Date() },
            create: {
                userId: data.userId,
                teamId: data.teamId,
                challengeId: data.challengeId,
                status: data.status,
            },
        });

        this.broadcastSystemUpdate();
    }

    @SubscribeMessage('leave_challenge')
    async handleLeaveChallenge(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { userId: string; challengeId: string },
    ) {
        await this.prisma.user.update({
            where: { id: data.userId },
            data: { status: 'IDLE', currentChallengeId: null },
        });

        await this.prisma.activeSession.deleteMany({
            where: { userId: data.userId, challengeId: data.challengeId },
        });

        client.leave(`challenge_${data.challengeId}`);
        this.broadcastSystemUpdate();
    }

    broadcastSystemUpdate() {
        this.server.emit('system_stats_update');
    }
}
