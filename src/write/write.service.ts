import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ChatService } from '../chat/chat.service';
import { DrawingService } from '../drawing/drawing.service';

@Injectable()
export class WriteService {
  constructor(
    private chatService: ChatService,
    private drawService: DrawingService,
  ) {}
  async createPost() {
    const title = `타입스크립트의 전망`;
    const createdContents = await this.chatService.createChatCompletion(
      title,
      'me',
    );

    const contents: {
      title: string;
      tag: string;
      content: string;
      titleEn: string;
    } = JSON.parse(createdContents.content);

    const imageTag = `<img src="data:image/png;base64, ${await this.drawService.createImage(
      contents.titleEn,
    )}" alt="title"/>`;

    const param = {
      access_token:
        '8dc5ba83303b7d95be564543c27e0d35_06914afccfb98626d05461de1056dd10',
      output: 'json',
      blogName: 'fathory',
      visibility: 3,
      category: 0,
      published: '',
      title: contents.title,
      tag: contents.tag,
      content: `${imageTag} ${contents.content}`,
    };

    return await axios.post('https://www.tistory.com/apis/post/write', param);
  }
}
