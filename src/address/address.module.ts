import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from '../entity/address.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AddressController],
  imports: [HttpModule, TypeOrmModule.forFeature([Address])],
  providers: [AddressService]
})
export class AddressModule { }
