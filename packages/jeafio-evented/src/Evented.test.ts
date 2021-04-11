import { Evented } from './Evented';

describe('Evented', () => {
  it('should call all listeners on emit', () => {
    interface TestEvents {
      change: (data: number) => void;
    }

    class TestEvent extends Evented<TestEvents> {}

    const te = new TestEvent();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    te.on('change', callback1).on('change', callback2).emit('change', 5);

    expect(callback1).toHaveBeenCalledWith(5);
    expect(callback2).toHaveBeenCalledWith(5);
  });
});
