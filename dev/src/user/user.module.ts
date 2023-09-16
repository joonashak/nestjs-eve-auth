import { Module } from "@nestjs/common";
import { UserService } from "./user.service";

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  // exports: [MongooseModule],
  exports: [UserService],
})
export class UserModule {}
