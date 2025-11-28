import { MyBusinessPipe } from './my-business.pipe';

describe('MyBusinessPipe', () => {
  it('create an instance', () => {
    const pipe = new MyBusinessPipe();
    expect(pipe).toBeTruthy();
  });
});
