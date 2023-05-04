import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/db/prisma.service';
import { SaveTokenInput } from './dto/save-token.input';
import { GenerateTokenInput } from './dto/generate-token.input copy';
import { TokenPayload } from './entities/tokenPayload.entity';
import { CommonError } from 'src/exceptions/common.error';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  generateTokens(payload: GenerateTokenInput) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(data: SaveTokenInput) {
    const tokenData = await this.prisma.token.findFirst({
      where: {
        userId: data.userId,
      },
    });
    if (tokenData) {
      return this.prisma.token.update({
        where: {
          userId: tokenData.userId,
        },
        data: {
          refreshToken: data.refreshToken,
        },
      });
    }
    const token = await this.prisma.token.create({ data });
    return token;
  }

  async removeToken(userId: number) {
    const tokenData = await this.prisma.token.delete({
      where: {
        userId,
      },
    });
    return tokenData;
  }

  async findTokenByUserId(userId: number) {
    const tokenData = await this.prisma.token.findFirst({
      where: {
        userId,
      },
    });
    return tokenData;
  }

  validateAcceessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });
      return userData;
    } catch (e) {
      throw CommonError.ServerError();
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = this.jwtService.verify<TokenPayload>(refreshToken, {
        secret: process.env.SECRET_KEY,
      });
      return userData;
    } catch (e) {
      throw CommonError.ServerError();
    }
  }
}
