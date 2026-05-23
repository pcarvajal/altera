import { EnumValueObject, InvalidArgumentError } from 'shared';
import { State } from '../enums/State';

export class ChargeState extends EnumValueObject<string> {
  constructor({ value }: { value: string }) {
    super({ value, validValues: Object.values(State) });
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError({
      message: `Charge State must be one of: ${Object.values(State).join(', ')}, but received <<< ${value} >>>`
    });
  }
}
