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
import { ProjectAnalyticsModule } from './project-analytics/project-analytics.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

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
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError:GraphQLFormattedError = {
         message: error.message
        };
        return graphQLFormattedError;
      },
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
    ProjectAnalyticsModule
  ],
  // providers: [AdminResolver],
})
export class AppModule {}
