import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // FIXME: Export types from lib!
  async ssoLogin(user: any) {
    await this.userModel.create({
      name: user.character.name,
      esiId: user.character.id,
      accessToken: user.tokens.accessToken,
      refreshToken: user.tokens.refreshToken,
    });
  }
}
