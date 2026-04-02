import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@zapsters/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Successfully connected to Database');
        } catch (error) {
            this.logger.error('Failed to connect to Database. Ensure DATABASE_URL is correct.');
            this.logger.debug(error);
            // In development, we might want to still boot the server so other parts of the app work
            // But be aware that DB-dependent features will fail.
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
