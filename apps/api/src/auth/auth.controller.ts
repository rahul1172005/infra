import { Controller, Post, Body, Get, Patch, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(private readonly authService: AuthService) {}

    @Post('google')
    async googleLogin(@Body('token') token: string) {
        this.logger.log(`Received Google Login request for token: ${token ? (token.substring(0, 10) + '...') : 'NULL'}`);
        try {
            const result = await this.authService.googleLogin(token);
            this.logger.log(`Google Login successful for user: ${result.user.email}`);
            return result;
        } catch (error) {
            this.logger.error(`Google Login failed: ${error.message}`);
            throw error;
        }
    }

    @Post('login')
    async login(@Body() body: any, @Req() req: any) {
        this.logger.log(`Received credential login request for: ${body.email}`);
        return this.authService.loginWithCredentials(
            body.email, 
            body.password, 
            req.ip || req.headers['x-forwarded-for'], 
            req.headers['user-agent']
        );
    }

    @Post('register')
    async register(@Body() body: any) {
        this.logger.log(`Received manual registration request for: ${body.email}`);
        return this.authService.register(body.email, body.password, body.name);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req: any) {
        this.logger.log(`Fetching profile for user ID: ${req.user.sub}`);
        return this.authService.getUserProfile(req.user.sub);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateProfile(@Req() req: any, @Body() updateData: any) {
        this.logger.log(`Updating profile for user ID: ${req.user.sub}`);
        return this.authService.updateProfile(req.user.sub, updateData);
    }
}
