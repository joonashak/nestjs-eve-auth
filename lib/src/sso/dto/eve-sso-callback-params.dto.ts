import { IsNotEmpty } from "class-validator";

export class EveSsoCallbackParams {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  state: string;
}
