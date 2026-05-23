import { AggregateRoot, ChargeId, ClientId, Nullable } from 'shared';
import { Reference } from './value-objects/Reference';
import { GenerationDate } from './value-objects/GenerationDate';
import { RejectDetails } from './value-objects/RejectDetails';
import { ChargeIdMissingError } from './errors/ChargeIdMissingError';

import { ChargeScalar } from './ChargeScalar';
import { InvalidChargeStateTransitionError } from './errors/InvalidChargeStateTransitionError';
import { RejectDetailsError } from './errors/RejectDetailsError';
import { Amount } from './value-objects/Amount';
import { ChargeState } from './value-objects/ChargeState';

export class Charge extends AggregateRoot {
  private id: ChargeId;
  private reference: Reference;
  private clientId: ClientId;
  private generationDate: GenerationDate;
  private amount: Amount;
  private state: ChargeState;
  private rejectDetails: Nullable<RejectDetails>;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(
    id: ChargeId,
    reference: Reference,
    clientId: ClientId,
    generationDate: GenerationDate,
    amount: Amount,
    state: ChargeState,
    rejectDetails: Nullable<RejectDetails>,
    createdAt: Date,
    updatedAt: Date
  ) {
    super();
    this.id = id;
    this.reference = reference;
    this.clientId = clientId;
    this.generationDate = generationDate;
    this.amount = amount;
    this.state = state;
    this.rejectDetails = rejectDetails;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(scalars: ChargeScalar): Charge {
    if (!scalars.id) throw new ChargeIdMissingError();
    return new Charge(
      new ChargeId({ value: scalars.id }),
      new Reference({ value: scalars.reference }),
      new ClientId({ value: scalars.clientId }),
      new GenerationDate({ value: scalars.generationDate }),
      new Amount({ value: scalars.amount }),
      new ChargeState({ value: scalars.state }),
      null,
      new Date(),
      new Date()
    );
  }

  static fromScalars(scalars: ChargeScalar): Charge {
    return new Charge(
      new ChargeId({ value: scalars.id! }),
      new Reference({ value: scalars.reference }),
      new ClientId({ value: scalars.clientId }),
      new GenerationDate({ value: scalars.generationDate }),
      new Amount({ value: scalars.amount }),
      new ChargeState({ value: scalars.state }),
      scalars.rejectDetails ? new RejectDetails({ value: scalars.rejectDetails }) : null,
      scalars.createdAt,
      scalars.updatedAt
    );
  }

  toScalars(): ChargeScalar {
    return {
      id: this.id.value,
      reference: this.reference.value,
      clientId: this.clientId.value,
      generationDate: this.generationDate.value,
      state: this.state.value,
      amount: this.amount.value,
      rejectDetails: this.rejectDetails?.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  updateState(newState: string, rejectDetails?: string): void {
    const newChargeState = new ChargeState({ value: newState });
    if (newChargeState.value === 'REVIEWED' && this.state.value !== 'PENDING') {
      throw new InvalidChargeStateTransitionError(this.state.value, newChargeState.value);
    }
    if (newChargeState.value === 'CONFIRMED' && this.state.value !== 'REVIEWED') {
      throw new InvalidChargeStateTransitionError(this.state.value, newChargeState.value);
    }
    if (newChargeState.value === 'REJECTED' && this.state.value !== 'REVIEWED') {
      throw new InvalidChargeStateTransitionError(this.state.value, newChargeState.value);
    }

    if (newChargeState.value === 'REJECTED' && !rejectDetails) {
      throw new RejectDetailsError();
    }

    this.state = newChargeState;
  }
}
