import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [ChatModule],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
