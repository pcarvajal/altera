import { randomUUID } from 'crypto';
import { Charge } from '../../../../src/core/domain/charge/Charge';
import { ChargeScalar } from '../../../../src/core/domain/charge/ChargeScalar';
import { State } from '../../../../src/core/domain/charge/enums/State';
import { ChargeIdMissingError } from '../../../../src/core/domain/charge/errors/ChargeIdMissingError';
import { AmountNegativeError } from '../../../../src/core/domain/charge/errors/AmountNegativeError';
import { InvalidChargeStateTransitionError } from '../../../../src/core/domain/charge/errors/InvalidChargeStateTransitionError';
import { RejectDetailsError } from '../../../../src/core/domain/charge/errors/RejectDetailsError';
import { InvalidArgumentError } from 'shared';

function validScalars(overrides: Partial<ChargeScalar> = {}): ChargeScalar {
  return {
    id: randomUUID(),
    reference: 'REF-001',
    clientId: randomUUID(),
    generationDate: new Date('2026-01-15'),
    amount: 1500,
    state: State.PENDING,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    ...overrides
  };
}

describe('Charge', () => {
  describe('create', () => {
    it('creates a charge with valid scalars', () => {
      const scalars = validScalars();
      const charge = Charge.create(scalars);
      const result = charge.toScalars();

      expect(result.id).toBe(scalars.id);
      expect(result.reference).toBe(scalars.reference);
      expect(result.clientId).toBe(scalars.clientId);
      expect(result.amount).toBe(scalars.amount);
      expect(result.state).toBe(State.PENDING);
      expect(result.rejectDetails).toBeUndefined();
    });

    it('sets createdAt and updatedAt to now on create', () => {
      const before = new Date();
      const charge = Charge.create(validScalars());
      const after = new Date();
      const { createdAt, updatedAt } = charge.toScalars();

      expect(createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
      expect(updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(updatedAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('throws ChargeIdMissingError when id is undefined', () => {
      const scalars = validScalars({ id: undefined });
      expect(() => Charge.create(scalars)).toThrow(ChargeIdMissingError);
    });

    it('throws AmountNegativeError when amount is negative', () => {
      const scalars = validScalars({ amount: -100 });
      expect(() => Charge.create(scalars)).toThrow(AmountNegativeError);
    });

    it('allows amount of zero', () => {
      const charge = Charge.create(validScalars({ amount: 0 }));
      expect(charge.toScalars().amount).toBe(0);
    });

    it('throws InvalidArgumentError when state is not a valid State', () => {
      const scalars = validScalars({ state: 'INVALID_STATE' });
      expect(() => Charge.create(scalars)).toThrow(InvalidArgumentError);
    });

    it('throws InvalidArgumentError when reference is empty', () => {
      const scalars = validScalars({ reference: '   ' });
      expect(() => Charge.create(scalars)).toThrow(InvalidArgumentError);
    });

    it('throws InvalidArgumentError when reference exceeds 255 characters', () => {
      const scalars = validScalars({ reference: 'A'.repeat(256) });
      expect(() => Charge.create(scalars)).toThrow(InvalidArgumentError);
    });

    it('accepts reference of exactly 255 characters', () => {
      const charge = Charge.create(validScalars({ reference: 'A'.repeat(255) }));
      expect(charge.toScalars().reference).toHaveLength(255);
    });

    it('throws InvalidArgumentError when id is not a valid UUID', () => {
      const scalars = validScalars({ id: 'not-a-uuid' });
      expect(() => Charge.create(scalars)).toThrow(InvalidArgumentError);
    });

    it('throws InvalidArgumentError when clientId is not a valid UUID', () => {
      const scalars = validScalars({ clientId: 'not-a-uuid' });
      expect(() => Charge.create(scalars)).toThrow(InvalidArgumentError);
    });
  });

  describe('fromScalars', () => {
    it('reconstitutes a charge from persisted scalars', () => {
      const scalars = validScalars({
        state: State.REVIEWED,
        rejectDetails: undefined
      });
      const charge = Charge.fromScalars(scalars);
      const result = charge.toScalars();

      expect(result.id).toBe(scalars.id);
      expect(result.state).toBe(State.REVIEWED);
      expect(result.createdAt).toBe(scalars.createdAt);
      expect(result.updatedAt).toBe(scalars.updatedAt);
    });

    it('reconstitutes a rejected charge preserving rejectDetails', () => {
      const scalars = validScalars({
        state: State.REJECTED,
        rejectDetails: 'Payment method declined by bank.'
      });
      const charge = Charge.fromScalars(scalars);
      expect(charge.toScalars().rejectDetails).toBe(scalars.rejectDetails);
    });

    it('reconstitutes with null rejectDetails when field is absent', () => {
      const scalars = validScalars({ state: State.CONFIRMED, rejectDetails: undefined });
      const charge = Charge.fromScalars(scalars);
      expect(charge.toScalars().rejectDetails).toBeUndefined();
    });

    it('reconstitutes all four states without error', () => {
      for (const state of Object.values(State)) {
        const overrides: Partial<ChargeScalar> =
          state === State.REJECTED
            ? { state, rejectDetails: 'Rejected due to insufficient funds.' }
            : { state, rejectDetails: undefined };
        expect(() => Charge.fromScalars(validScalars(overrides))).not.toThrow();
      }
    });
  });

  describe('toScalars', () => {
    it('round-trips: fromScalars → toScalars returns equal primitives', () => {
      const scalars = validScalars({ state: State.PENDING });
      const result = Charge.fromScalars(scalars).toScalars();

      expect(result.id).toBe(scalars.id);
      expect(result.reference).toBe(scalars.reference);
      expect(result.clientId).toBe(scalars.clientId);
      expect(result.generationDate).toBe(scalars.generationDate);
      expect(result.amount).toBe(scalars.amount);
      expect(result.state).toBe(scalars.state);
      expect(result.rejectDetails).toBeUndefined();
      expect(result.createdAt).toBe(scalars.createdAt);
      expect(result.updatedAt).toBe(scalars.updatedAt);
    });
  });

  describe('updateState', () => {
    describe('valid transitions', () => {
      it('transitions from PENDING to REVIEWED', () => {
        const charge = Charge.create(validScalars({ state: State.PENDING }));
        charge.updateState(State.REVIEWED);
        expect(charge.toScalars().state).toBe(State.REVIEWED);
      });

      it('transitions from REVIEWED to CONFIRMED', () => {
        const charge = Charge.fromScalars(validScalars({ state: State.REVIEWED }));
        charge.updateState(State.CONFIRMED);
        expect(charge.toScalars().state).toBe(State.CONFIRMED);
        expect(charge.toScalars().rejectDetails).toBeUndefined();
      });

      it('transitions from REVIEWED to REJECTED with details', () => {
        const charge = Charge.fromScalars(validScalars({ state: State.REVIEWED }));
        const details = 'Insufficient funds in client account.';
        charge.updateState(State.REJECTED, details);
        const result = charge.toScalars();
        expect(result.state).toBe(State.REJECTED);
        expect(result.rejectDetails).toBe(details);
      });
    });

    describe('invalid transitions', () => {
      it('throws when transitioning PENDING → CONFIRMED', () => {
        const charge = Charge.create(validScalars({ state: State.PENDING }));
        expect(() => charge.updateState(State.CONFIRMED)).toThrow(
          InvalidChargeStateTransitionError
        );
      });

      it('throws when transitioning PENDING → REJECTED', () => {
        const charge = Charge.create(validScalars({ state: State.PENDING }));
        expect(() => charge.updateState(State.REJECTED, 'Some reason here.')).toThrow(
          InvalidChargeStateTransitionError
        );
      });

      it('throws when transitioning CONFIRMED → REVIEWED', () => {
        const charge = Charge.fromScalars(validScalars({ state: State.CONFIRMED }));
        expect(() => charge.updateState(State.REVIEWED)).toThrow(InvalidChargeStateTransitionError);
      });

      it('throws when transitioning CONFIRMED → REJECTED', () => {
        const charge = Charge.fromScalars(validScalars({ state: State.CONFIRMED }));
        expect(() => charge.updateState(State.REJECTED, 'Some reason here.')).toThrow(
          InvalidChargeStateTransitionError
        );
      });

      it('throws when transitioning REJECTED → REVIEWED', () => {
        const charge = Charge.fromScalars(
          validScalars({ state: State.REJECTED, rejectDetails: 'Declined by processor.' })
        );
        expect(() => charge.updateState(State.REVIEWED)).toThrow(InvalidChargeStateTransitionError);
      });
    });

    describe('REJECTED requires rejectDetails', () => {
      it('throws RejectDetailsError when transitioning to REJECTED without details', () => {
        const charge = Charge.fromScalars(validScalars({ state: State.REVIEWED }));
        expect(() => charge.updateState(State.REJECTED)).toThrow(RejectDetailsError);
      });

      it('throws RejectDetailsError when rejectDetails is an empty string', () => {
        const charge = Charge.fromScalars(validScalars({ state: State.REVIEWED }));
        expect(() => charge.updateState(State.REJECTED, '')).toThrow(RejectDetailsError);
      });

      it('throws InvalidArgumentError when rejectDetails is shorter than 10 characters', () => {
        const charge = Charge.fromScalars(validScalars({ state: State.REVIEWED }));
        expect(() => charge.updateState(State.REJECTED, 'Short')).toThrow(InvalidArgumentError);
      });

      it('throws InvalidArgumentError when rejectDetails exceeds 255 characters', () => {
        const charge = Charge.fromScalars(validScalars({ state: State.REVIEWED }));
        expect(() => charge.updateState(State.REJECTED, 'R'.repeat(256))).toThrow(
          InvalidArgumentError
        );
      });
    });

    describe('CONFIRMED clears rejectDetails', () => {
      it('clears rejectDetails when confirming after reconstituting from REVIEWED', () => {
        const charge = Charge.fromScalars(validScalars({ state: State.REVIEWED }));
        charge.updateState(State.CONFIRMED);
        expect(charge.toScalars().rejectDetails).toBeUndefined();
      });
    });

    it('throws InvalidArgumentError when target state is not a valid State', () => {
      const charge = Charge.create(validScalars({ state: State.PENDING }));
      expect(() => charge.updateState('UNKNOWN')).toThrow(InvalidArgumentError);
    });
  });
});
