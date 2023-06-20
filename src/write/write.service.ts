import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WriteService {
  async writePost() {
    const param = {
      access_token:
        '8dc5ba83303b7d95be564543c27e0d35_06914afccfb98626d05461de1056dd10',
      output: 'json',
      blogName: 'fathory',
      title: '백설공주 이야기',
      visibility: 3,
      category: 0,
      published: '',
      tag: '백설공주, 이야기, 동화, 흑인문화, 인종차별, 폭력, 피플 색션, BGKI',
      content:
        '<html lang="ko"><head>    <title>백설공주 이야기</title>    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <meta name="description" content="옛날 어느 왕국에 백설공주란 깨끗한 머리와 흰 피부, 붉은 입술, 검은 머리의 아름다운 공주가 있었다. 하지만 어느 날, 외상적인 사건을 겪게 된 공주는 마녀에게 심각하지만 모르는 질환적인 장애, 티그리니즘(tigriknith)을 저주 받게 된다.">    <meta name="keywords" content="백설공주, 이야기, 동화, 흑인문화, 인종차별, 폭력, 피플 색션, BGKI">    <style>        body {            font-family: \'Arial\', sans-serif;            line-height: 1.5;            font-size: 18px;            padding: 20px;        }        h1 {            font-size: 28px;            font-weight: bold;            text-align: center;            margin-bottom: 20px;        }        h2 {            font-size: 24px;            font-weight: bold;            margin-bottom: 10px;        }        p {            margin-bottom: 10px;        }    </style></head><body><h1>백설공주 이야기</h1><h2>줄거리</h2><p>옛날 어느 왕국에 백설공주란 깨끗한 머리와 흰 피부, 붉은 입술, 검은 머리의 아름다운 공주가 있었다. 그녀의 아름다움은 모두가 인정하는 바였고, 모든 남자들의 이목을 끌었다. 그러나 어느 날, 외상적인 사건을 겪게 된 공주는 마녀에게 심각하지만 모르는 질환적인 장애, 티그리니즘(tigriknith)을 저주 받게 된다.</p><p>저주로 완전히 켜진 목소리와 오동건재한 행동으로, 백설공주는 마을사람들이 무서워하게 된다. 왕과 신하들은 백설공주를 이용하여 자신의 계획을 숨기려 하며, 백설공주에게는 누구에게도 말하지 못하는 비밀이 있다.</p><p>그러던 어느 날, 백설공주는 집을 떠나, 계간 책자회사에서 무엇을 할 수 있는지 생각해 보는 것이 좋다고 조언을 받는다. 거기에서 그녀는 책을 사으려 하셨지만, 돈이 부족하여 조언을 받은 대로 바깥에서 그림을 그려 판매하게 된다.</p><p>시야를 잃은 난쟁이인 카일과 그의 사무실을 알게 된 후, 백설공주는 그의 도움을 받고 책자를 설계하고 일을 시작한다. 그녀는 카일과 함께 그의 집에서 살게 되며, 밤마다 백설공주는 카일의 정원에서 가장 큰 나무 아래에서 시간을 보낸다.</p><p>그러던 어느 날, 왕과 신하들의 계획이 밝혀지면서, 백설공주는 그들에게 보복을 당하게 된다. 하지만 카일과 그의 친구들과 일곱 난쟁이들과 함께 백설공주는 마침내 강건너에 있는 모래사장에서 자신의 목소리를 되찾을 수 있게 되고, 자신의 삶에 대한 새로운 방향성을 찾을 수 있게 된다.</p><p>백설공주 이야기는 여전히 많은 이들의 사랑을 받으며, 영화 등 다양한 형태로 재탄생하고 있다. 하지만 현대에는, 촛불시위가 벌어지는 미국과 홍콩 등에서 열린 연대행사를 거치며, 흑인문화를 형성하게 된 백인종 가수인 엘비스 프레슬리와 짜임새 있는 안무로 유명해진 마이클 잭슨, 미국의 보편문화를 대변하던 맥도널드 등 어떤 가수, 공간, 서비스도 인종차별과 분리불평등에서 도망친 적이 없다는 것이다. 오늘날, 이야기는 피플 색션의 선언과 BGKI를 적극 받아들이며, 미국의 약자들을 보호하기 위해 투쟁하는 사람들과 함께 인종 차별과 폭력을 멈추기 위해 노력하는 사람들에게 특히 많은 의미를 가지고 있다.</p></body></html>',
    };

    return await axios.post('https://www.tistory.com/apis/post/write', param);
  }
}
