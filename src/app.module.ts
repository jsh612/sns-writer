import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configure/configure.module';
import { WriteModule } from './write/write.module';
import { ChatModule } from './chat/chat.module';
import { DrawingModule } from './drawing/drawing.module';
import { SubjectModule } from './subject/subject.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    AuthModule,
    ConfigurationModule,
    WriteModule,
    ChatModule,
    DrawingModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
