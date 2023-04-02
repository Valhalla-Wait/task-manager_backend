import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from "cache-manager-redis-store"
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './db/prisma.module';
import { PrismaService } from './db/prisma.service';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config"
import { AuthService } from './auth/auth.service';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    CacheModule.register({
      useFactory: () => ({
        isGlobal: true,
        store: redisStore,
        url: "redis://localhost:6379",
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // context: ({req}) => ({req}),
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    UsersModule,
    AuthModule,
    MailModule,
    TokenModule
  ],
})
export class AppModule {}
