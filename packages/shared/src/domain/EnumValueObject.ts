export abstract class EnumValueObject<T> {
  readonly value: T;
  public readonly validValues: T[];

  protected constructor({ value, validValues }: { value: T; validValues: T[] }) {
    this.value = value;
    this.validValues = validValues;
    this.checkValueIsValid(value);
  }

  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
