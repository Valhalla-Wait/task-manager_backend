import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/Prisma/prisma.module';
import { PrismaService } from './services/Prisma/prisma.service';
import * as redisStore from "cache-manager-redis-store"

@Module({
  imports: [
    PrismaModule,
    CacheModule.register({
      useFactory: () => ({
        isGlobal: true,
        store: redisStore,
        url: "redis://localhost:6379",
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
