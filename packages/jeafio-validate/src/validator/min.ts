import { Validator } from '../Validator';

export function min(min: number): Validator<NumberConstructor, number> {
  return {
    type: Number,
    name: 'min',
    validator: (value, field) => {
      if (value < min) {
        return [
          {
            field,
            type: 'NUMBER_MIN',
            message: `Expected value to be greater or equal ${min}`,
          },
        ];
      }
    },
  };
}
