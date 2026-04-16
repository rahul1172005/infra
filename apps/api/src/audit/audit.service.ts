import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
    constructor(private prisma: PrismaService) {}

    async log(data: {
        userId?: string;
        action: string;
        entityType?: string;
        entityId?: string;
        description: string;
        metadata?: any;
        ipAddress?: string;
        userAgent?: string;
        severity?: 'INFO' | 'WARNING' | 'CRITICAL';
    }) {
        try {
            return await this.prisma.auditLog.create({
                data: {
                    userId: data.userId,
                    action: data.action,
                    entityType: data.entityType,
                    entityId: data.entityId,
                    description: data.description,
                    metadata: data.metadata || {},
                    ipAddress: data.ipAddress,
                    userAgent: data.userAgent,
                    severity: data.severity || 'INFO',
                },
            });
        } catch (error) {
            console.error('Audit Logging Failed:', error);
            // We don't throw here to avoid breaking the main flow if audit fails
        }
    }
}
