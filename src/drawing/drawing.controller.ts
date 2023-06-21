import { Controller, Get, Query } from '@nestjs/common';
import { DrawingService } from './drawing.service';

@Controller('drawing')
export class DrawingController {
  constructor(private drawingService: DrawingService) {}
  @Get()
  async drawImage(@Query('command') command: string) {
    return await this.drawingService.createImage(command);
  }
}
