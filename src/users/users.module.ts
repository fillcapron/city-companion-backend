import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/users.entity';

@Module({
  providers: [UserService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService]
})
export class UserModule {}
