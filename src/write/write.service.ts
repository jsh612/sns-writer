import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { format } from 'date-fns';
import { XMLParser } from 'fast-xml-parser';
import { ChatService } from '../chat/chat.service';
import { DrawingService } from '../drawing/drawing.service';
import { AttachImageResponse } from './dto/attach-image.dto';
import { Category, CreatePostInput } from './write.model';

@Injectable()
export class WriteService {
  private xmlParser: XMLParser;
  constructor(
    private chatService: ChatService,
    private drawService: DrawingService,
    private configService: ConfigService,
  ) {
    this.xmlParser = new XMLParser({ parseTagValue: false });
  }
  async createPost({ title, searchText, category, tag }: CreatePostInput) {
    const blogTitle = title;
    const createdSubjects = await this.chatService.createSubject(searchText);

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

        const createdContents = await this.chatService.createChatCompletion(
          searchText,
          'me',
          title,
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
          // return new Promise<null>(null);
        }
        // let imageTag = '';

        // if (contents.titleEn) {
        //   try {
        //     const createdImage = await this.drawService.createImage(
        //       contents.titleEn,
        //     );

        //     const {
        //       tistory: { url: imageUrl },
        //     } = await this.attachFileByRemoteUrl(createdImage);

        //     imageTag = `<img src="${imageUrl}" alt="title"/>`;
        //   } catch (e) {
        //     console.log(e);
        //   }
        // }
        const accessToken = this.configService.get<string>(
          'TISTORY_ACCESS_TOKEN',
        );

        const blogName = this.configService.get<string>('TISTORY_BLOG_NAME');

        const param = {
          access_token: accessToken,
          output: 'json',
          blogName: blogName ?? 'ewoos',
          visibility: this.configService.get<number>('POST_VISIBLE'),
          category: category ?? 1139820,
          published: time,
          title: blogTitle,
          tag: tag.join(',') + contents.tag,
          content: `${contents.content}`,
        };

        await axios.post('https://www.tistory.com/apis/post/write', param);
      }),
    );
  }

  async attachFileByRemoteUrl(url: string): Promise<AttachImageResponse> {
    const imageStream = await axios.get(url, { responseType: 'stream' });
    const response = await axios.postForm(
      `https://www.tistory.com/apis/post/attach`,
      {
        uploadedfile: imageStream.data,
        blogName: this.configService.get<string>('TISTORY_BLOG_NAME'),
        access_token: this.configService.get<string>('TISTORY_ACCESS_TOKEN'),
      },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'json',
      },
    );
    return this.xmlParser.parse(response.data);
  }

  async getCategories(): Promise<Category[]> {
    const access_token = this.configService.get<string>('TISTORY_ACCESS_TOKEN');
    const output = 'json';
    const blogName = this.configService.get<string>('TISTORY_BLOG_NAME');

    const { data } = await axios.get(
      `https://www.tistory.com/apis/category/list?access_token=${access_token}&output=${output}&blogName=${blogName}`,
    );

    return data.tistory.item.categories;
  }
}
