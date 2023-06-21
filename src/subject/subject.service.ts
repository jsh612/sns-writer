import { Injectable } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class SubjectService {
  constructor(private chatService: ChatService) {}

  async createSubject(prompt: string) {
    const subjects = await this.chatService.createSubject(prompt);
    const titleArray: { title: string }[] = JSON.parse(subjects.content);

    for (const titleArrayElement of titleArray) {
      console.log(titleArrayElement.title);
    }

    return titleArray;
  }
}
