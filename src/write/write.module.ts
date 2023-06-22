import { Module } from '@nestjs/common';
import { WriteController } from './write.controller';
import { WriteService } from './write.service';
import { ChatModule } from '../chat/chat.module';
import { WriteResolver } from './write.resolver';
import { DrawingModule } from '../drawing/drawing.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [ChatModule, DrawingModule, SubjectModule],
  controllers: [WriteController],
  providers: [WriteService, WriteResolver],
})
export class WriteModule {}
