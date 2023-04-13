import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth/activate')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get(':link')
    async findOne(@Param('link') link:string, @Res() res: Response) {
        try {
            await this.authService.activate(link)
            return res.redirect(`${process.env.CLIENT_URL}`)
        } catch (e) {
            //Create errors middleware!
            console.log(e)
        }
    }
}
