import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

interface LoginArg {
  name: string;
  email: string;
  image: string;
}

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login({ name, email, image }: LoginArg): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email });
      if (user) return user;

      const newUser = new this.userModel({ email, name, image });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
