import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * 1. 티스토리 인증
 * 2. Access Token 가져오기
 * 3. 글쓰기
 * 4. GPT 연결하기
 * 5. GPT 연결내용 게시글 포맷 맞추기
 * 6. 관련된 태그 20개 뽑아오기
 * 7. 글쓰기
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getAuthentication() {
    await this.authService.getAccessToken();
  }
}
