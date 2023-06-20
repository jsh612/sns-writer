import { Module } from '@nestjs/common';
import { WriteController } from './write.controller';
import { WriteService } from './write.service';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [WriteController],
  providers: [WriteService],
})
export class WriteModule {}
