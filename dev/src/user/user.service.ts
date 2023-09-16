import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  // constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create() {
    // return this.userModel.create(user);
    console.log("UserService.create called!");
  }
}
