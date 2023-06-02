import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesResolver } from './statuses.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [StatusesResolver, StatusesService],
  imports:[AuthModule]
})
export class StatusesModule {}
