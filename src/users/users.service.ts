import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    let response: any = {};
    try {
      response = await this.model.find().exec();
    } catch (error) {
      return error;
    }
    return response;
  }

  async findOne(id: string): Promise<User> {
    let response: any = {};
    try {
      response = await this.model.findById(id).exec();
    } catch (error) {
      return error;
    }
    return response;
  }

  async create(createUserDto: CreateUserDto) {
    let response: any = {};
    try {
      response = await new this.model({
        ...createUserDto,
        createdAt: new Date(),
      }).save();
    } catch (error) {
      return error;
    }
    return response;
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let response: any = {};
    try {
      response = await this.model.findByIdAndUpdate(id, updateUserDto).exec();
    } catch (error) {
      return error;
    }
    return response;
  }

  async delete(id: string): Promise<User> {
    let response: any = {};
    try {
      response = await this.model.findByIdAndDelete(id).exec();
    } catch (error) {
      return error;
    }
    return response;
  }
}
