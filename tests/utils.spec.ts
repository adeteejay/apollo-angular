import { fromPromise } from '../src/utils';

describe('fromPromise', () => {
  it('should emit a value when resolved', (done: jest.DoneCallback) => {
    fromPromise(() => Promise.resolve('resolved'))
      .subscribe({
        next(r) {
          expect(r).toBe('resolved');
          done();
        },
        error() {
          done.fail('should not be called');
        },
      });
  });

  it('should complete when resolved', (done: jest.DoneCallback) => {
    fromPromise(() => Promise.resolve('resolved'))
      .subscribe({
        error() {
          done.fail('should not be called');
        },
        complete() {
          done();
        },
      });
  });

  it('should emit an error when rejected', (done: jest.DoneCallback) => {
    fromPromise(() => Promise.reject('rejected'))
      .subscribe({
        next() {
          done.fail('should not be called');
        },
        error(e) {
          expect(e).toBe('rejected');
          done();
        },
      });
  });
});
