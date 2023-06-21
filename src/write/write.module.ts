import { Module } from '@nestjs/common';
import { WriteController } from './write.controller';
import { WriteService } from './write.service';
import { ChatModule } from '../chat/chat.module';
import { DrawingService } from '../drawing/drawing.service';

@Module({
  imports: [ChatModule],
  controllers: [WriteController],
  providers: [WriteService, DrawingService],
})
export class WriteModule {}
