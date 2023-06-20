import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class WriteService {
  constructor(private chatService: ChatService) {}
  async createPost() {
    const createdContents = await this.chatService.createChatCompletion(
      '라푼젤 이야기 작성해줘',
      'me',
    );

    console.log(createdContents);
    const contents: { title: string; tag: string; content: string } =
      JSON.parse(createdContents.content);

    console.log(contents.content);

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
      content: contents.content,
    };

    return await axios.post('https://www.tistory.com/apis/post/write', param);
  }
  async writePost() {
    const param = {
      access_token:
        '8dc5ba83303b7d95be564543c27e0d35_06914afccfb98626d05461de1056dd10',
      output: 'json',
      blogName: 'fathory',
      visibility: 3,
      category: 0,
      published: '',
      title: '백설공주 이야기',
      tag: '박정희,       대통령,       경제개혁,       관계개선,       한국의 발전',
      content:
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '   <head>\n' +
        '      <meta charset="UTF-8">\n' +
        '      <title>박정희 대통령에 대한 분석글</title>\n' +
        '   </head>\n' +
        '   <body>\n' +
        '      <h1>박정희 대통령에 대한 분석글</h1>\n' +
        '      <p>\n' +
        '         박정희 대통령은 1961년 5월 16일 군사 쿠데타로 대통령 자리에 오르면서 대한민국 역사상 가장 특이한 대통령 중 한 사람으로 기억됩니다. 그는 1972년 "유신정권(維新政權)"이라 불리는 단일 지도체제를 도입하였고 1980년 대한민국 민주주의 집권정당인 민주화운동당을 폭산시키며, 한국의 광률(光律)을 엄격하게 제한하였습니다. 그러나 그가 이끈 자본주의 개혁으로 인해 대한민국의 경제는 성장하였다는 사실도 또한 부인할 수는 없습니다.\n' +
        '      </p>\n' +
        '      <p>\n' +
        '         박정희 대통령이 긴 시기경제에 대한 새로운 개혁 체제를 구축하였고, 이를 바탕으로 대한민국 금융 계장과 기업들이 겉잡을 수 없는 경제적 전환을 겪게 되었습니다. 그 예시로는 대한외국인(外國人)들에 대한 투자, 서든재단(Daedong Foundation)에 대한 자본 투자, 새로운 산업 인프라(building infrastructure), 기술 인력 풀과 같은 대규모 인프라 개발 투자 등이 있습니다.\n' +
        '      </p>\n' +
        '      <p>\n' +
        '         그러나 경제성장이 이루어질 때 과도한 경제수위 현상이 발생하였으며, 이는 박정희 대통령의 정체성이 참혹해지는 데 일조하였습니다. 그러나 당시 대한민국의 경제 상황을 반영하면서, 이러한 수위 높은 경제개혁은 어쩔 수 없는 결과라고도 할 수 있습니다.\n' +
        '      </p>\n' +
        '      <p>\n' +
        '         박정희 대통령은 대한민국과 미국의 관계개선, 국가 안보 증진 등 다양한 분야에서의 역할을 수행하였습니다. 그의 적극적인 대외활동 덕분에 대한민국은 세계화됨에 따라 경제적 강점을 갖추게 되었으며, 다양한 국내 외교 협상 및 양국간의 협약 체결도 이루어졌습니다.\n' +
        '      </p>\n' +
        '      <p>\n' +
        '         그러나 단일 지도체제를 도입하고, 민주주의 체제를 부신 점, 박정희 대통령의 침약(侵略)적인 대만민국 정서 등의 문제들 때문에 그를 지지하고 반대하는 입장이 분명하게 존재하고 있습니다. 사실 그는 오랜 시간 동안 대한민국 사회를 주도해온 인물이었기 때문에 그의 장점과 단점 으로 나누는 것도 쉽지는 않습니다.\n' +
        '      </p>\n' +
        '      <p>\n' +
        '         하지만 그는 대한민국의 선진화와 경제성장에 막대한 역할을 하였으며, 대한민국 역사상 가장 추악한 정치인 또한 대한민국을 한 층 발전시켰다는 사실도 부인할 수 없습니다. 결론적으로 박정희 대통령은 한국의 발전을 위해 자신의 일대기를 위해 끊임없이 노력하고 대한민국을 발전시키는 데 큰 역할을 해주었습니다.\n' +
        '      </p>\n' +
        '      <h4>키워드:</h4>\n' +
        '      <ul>\n' +
        '         <li>박정희</li>\n' +
        '         <li>대통령</li>\n' +
        '         <li>경제개혁</li>\n' +
        '         <li>관계개선</li>\n' +
        '         <li>한국의 발전</li>\n' +
        '      </ul>\n' +
        '   </body>\n' +
        '</html>',
    };

    return await axios.post('https://www.tistory.com/apis/post/write', param);
  }
}
