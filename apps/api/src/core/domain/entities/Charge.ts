import { AggregateRoot, ChargeId, ClientId } from 'shared';
import { Reference } from './vo/Reference';
import { GenerationDate } from './vo/GenerationDate';
import { ChargeState } from './vo/ChargeState';
import { RejectDetails } from './vo/RejectDetails';
import { ChargeScalars } from './ChargeScalars';

export class Charge extends AggregateRoot {
  private readonly id: ChargeId;
  private readonly ref: Reference;
  private readonly clientId: ClientId;
  private readonly generationDate: GenerationDate;
  private readonly state: ChargeState;
  private readonly rejectDetails: RejectDetails;

  private constructor(
    id: ChargeId,
    ref: Reference,
    clientId: ClientId,
    generationDate: GenerationDate,
    state: ChargeState,
    rejectDetails: RejectDetails
  ) {
    super();
    this.id = id;
    this.ref = ref;
    this.clientId = clientId;
    this.generationDate = generationDate;
    this.state = state;
    this.rejectDetails = rejectDetails;
  }

  static create(scalars: ChargeScalars): Charge {
    return new Charge(
      new ChargeId({ value: scalars.id }),
      new Reference({ value: scalars.ref }),
      new ClientId({ value: scalars.clientId }),
      new GenerationDate({ value: scalars.generationDate }),
      new ChargeState({ value: scalars.state }),
      new RejectDetails({ value: scalars.rejectDetails })
    );
  }

  toScalars(): ChargeScalars {
    return {
      id: this.id.value,
      ref: this.ref.value,
      clientId: this.clientId.value,
      generationDate: this.generationDate.value,
      state: this.state.value,
      rejectDetails: this.rejectDetails.value
    };
  }
}
