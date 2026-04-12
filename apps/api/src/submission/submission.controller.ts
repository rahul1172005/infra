import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('submission')
@UseGuards(JwtAuthGuard)
export class SubmissionController {
    constructor(private readonly submissionService: SubmissionService) {}

    @Post()
    async submit(
        @Request() req: any,
        @Body('challengeId') challengeId: string,
        @Body('score') score: number
    ) {
        return this.submissionService.submitSolution(req.user.id, challengeId, score);
    }
}
