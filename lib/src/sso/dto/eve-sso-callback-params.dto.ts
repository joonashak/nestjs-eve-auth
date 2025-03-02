import { IsNotEmpty } from "class-validator";

/**
 * @group Types
 */
export class EveSsoCallbackParams {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  state: string;
}
