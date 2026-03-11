import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);
    constructor(private prisma: PrismaService) { }

    async createProject(clientId: string, title: string, desc: string, budget: number) {
        return this.prisma.project.create({
            data: { clientId, title, description: desc, budget, status: 'OPEN' }
        });
    }

    async submitBid(projectId: string, userId: string, amount: number, proposal: string) {
        return this.prisma.bid.create({
            data: { projectId, userId, amount, proposal }
        });
    }

    async acceptBid(bidId: string) {
        const bid = await this.prisma.bid.update({
            where: { id: bidId },
            data: { status: 'ACCEPTED' },
            include: { project: true }
        });

        await this.prisma.project.update({
            where: { id: bid.projectId },
            data: { status: 'IN_PROGRESS', assignedTo: bid.userId }
        });

        return bid;
    }

    async processPayment(projectId: string, payerId: string, payeeId: string, amount: number) {
        // In production, integrate Stripe SDK here
        this.logger.log(`Processing ${amount} for project ${projectId} to ${payeeId}`);

        return this.prisma.payment.create({
            data: { projectId, payerId, payeeId, amount, status: 'COMPLETED', stripeId: 'SIMULATED' }
        });
    }
}
