import { Module } from '@nestjs/common';
import { WriteController } from './write.controller';
import { WriteService } from './write.service';
import { ChatModule } from '../chat/chat.module';
import { DrawingService } from '../drawing/drawing.service';
import { SubjectService } from '../subject/subject.service';

@Module({
  imports: [ChatModule],
  controllers: [WriteController],
  providers: [WriteService, DrawingService, SubjectService],
})
export class WriteModule {}
