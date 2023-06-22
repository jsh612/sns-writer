import { Injectable } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';
import { DrawingService } from '../drawing/drawing.service';
import { format } from 'date-fns';
import { ConfigService } from '@nestjs/config';
import { CategoryEnum, CategoryType } from './category';
import * as fs from 'fs';
import axios from 'axios';

@Injectable()
export class WriteService {
  constructor(
    private chatService: ChatService,
    private drawService: DrawingService,
    private configService: ConfigService,
  ) {}
  async createPost(title: string, category: CategoryType) {
    const createdSubjects = await this.chatService.createSubject(title);

    const subjectList: { title: string }[] = JSON.parse(
      createdSubjects.content,
    );
    const hour = 1000 * 60 * 60;

    let time = '';

    let i = 0;

    return await Promise.all(
      subjectList.map(async ({ title }) => {
        time = format(
          new Date(new Date().getTime() + hour * i++),
          'yyyy-MM-dd HH:mm:ss',
        );
        console.log({ title, time });
        // return { title, time };
        const createdContents = await this.chatService.createChatCompletion(
          title,
          'me',
        );
        let contents: {
          title: string;
          tag: string;
          content: string;
          titleEn: string;
        } = {
          titleEn: title,
          tag: '',
          title: title,
          content: createdContents.content,
        };
        try {
          contents = JSON.parse(createdContents.content);
        } catch (e) {
          console.log(e);
          fs.writeFileSync(`./${contents.title}.json`, createdContents.content);
          // return new Promise<null>(null);
        }
        let imageTag = '';

        if (contents.titleEn) {
          try {
            imageTag = `<img src="data:image/png;base64, ${await this.drawService.createImage(
              contents.titleEn,
            )}" alt="title"/>`;
          } catch (e) {
            console.log(e);
          }
        }
        const accessToken = this.configService.get<string>(
          'TISTORY_ACCESS_TOKEN',
        );

        const blogName = this.configService.get<string>('TISTORY_BLOG_NAME');

        const param = {
          access_token: accessToken,
          output: 'json',
          blogName: blogName ?? 'fathory',
          visibility: this.configService.get<number>('POST_VISIBLE'),
          category: CategoryEnum[category] ?? 0,
          published: time,
          title: contents.title,
          tag: contents.tag,
          content: `${imageTag} ${contents.content}`,
        };

        await axios.post('https://www.tistory.com/apis/post/write', param);
      }),
    );
  }
}
