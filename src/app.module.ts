import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configure/configure.module';
import { WriteModule } from './write/write.module';

@Module({
  imports: [AuthModule, ConfigurationModule, WriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
