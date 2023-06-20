import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  async getAccessToken() {
    const code =
      '84df1a7e22ec4d1805639fe564697a1367286de92ef78886bb18d97c23faaa7f5fd9e5ce';

    const clientId = this.configService.get('TISTORY_APP_ID');
    const clientSecret = this.configService.get('TISTORY_SECRET');
    const url = `https://www.tistory.com/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=https://fathory.tistory.com&code=${code}&grant_type=authorization_code`;
    console.log({ url });
    const accessToken = await axios.get<{ access_token: string }>(url);

    console.log(accessToken.data.access_token);
  }
}
