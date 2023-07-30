import { IsNotEmpty } from "class-validator";

export class CallbackParams {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  state: string;
}
