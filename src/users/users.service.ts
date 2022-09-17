import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserEmailDto } from './dto/update-user-email-dto';
import { UpdateUserPasswordDto } from './dto/update-user-password-dto';
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

  async findByEmail(email: string) {
    let response: any = {};
    try {
      response = await this.model.findOne({ email: email }).exec();
    } catch (error) {
      return error;
    }
    return response;
  }

  async findByRole(role: string) {
    let response: any = {};
    try {
      response = await this.model.find({ role: role }).exec();
    } catch (error) {
      return error;
    }
    return response;
  }

  async findByUsername(username: string) {
    let response: any = {};
    try {
      response = await this.model.findOne({ username: username }).exec();
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
  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    let response: any = {};
    try {
      response = await this.model
        .findByIdAndUpdate(id, updateUserPasswordDto)
        .exec();
    } catch (error) {
      return error;
    }
    return response;
  }
  async updateEmail(
    id: string,
    updateUserEmailDto: UpdateUserEmailDto,
  ): Promise<User> {
    let response: any = {};
    try {
      response = await this.model
        .findByIdAndUpdate(
          id,
          { email: updateUserEmailDto['email'] },
          { new: true },
        )
        .exec();
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
  async validateUserSignUp(email: string, username: string): Promise<boolean> {
    let emailresponse: any = {};
    let usernameresponse: any = {};
    try {
      emailresponse = await this.model.findOne({ username: username }).exec();
      usernameresponse = await this.model.findOne({ email: email }).exec();

      if (emailresponse !== null || usernameresponse !== null) {
        return false;
      }
    } catch (error) {
      return error;
    }
    return true;
  }
  async validateUserEmailAndPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    let emailResponse: any = {};

    try {
      emailResponse = await this.model.findOne({ email: email }).exec();
      if (emailResponse === null) {
        return false;
      }
      if (emailResponse.email === email) {
        if (emailResponse.password === password) {
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      return error;
    }
  }
}
