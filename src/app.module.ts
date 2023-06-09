import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { TokenModule } from './token/token.module';
import { ProjectsModule } from './projects/projects.module';
import { GroupsModule } from './groups/groups.module';
import { TasksModule } from './tasks/tasks.module';
import { TagsModule } from './tags/tags.module';
import { StatusesModule } from './statuses/statuses.module';
import { ProjectAnaliticsModule } from './project-analytics/project-analitics.module';

@Module({
  imports: [
    CacheModule.register({
      useFactory: () => ({
        isGlobal: true,
        store: redisStore,
        url: 'redis://localhost:6379',
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    TokenModule,
    ProjectsModule,
    GroupsModule,
    TasksModule,
    TagsModule,
    StatusesModule,
    // AdminModule,
    ProjectAnaliticsModule
  ],
  // providers: [AdminResolver],
})
export class AppModule {}
