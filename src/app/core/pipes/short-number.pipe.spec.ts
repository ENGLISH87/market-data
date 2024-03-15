import { ShortNumberPipe } from './short-number.pipe';

describe('ShortNumberPipe', () => {
  let pipe: ShortNumberPipe;

  beforeEach(() => {
    pipe = new ShortNumberPipe();
  });

  it('should return null if NaN', () => {
    const res = pipe.transform(NaN);
    expect(res).toBeNull();
  });

  it('should return null if number is null', () => {
    const res = pipe.transform(null as never);
    expect(res).toBeNull();
  });

  it('should return 0 if number 0', () => {
    const res = pipe.transform(0);
    expect(res).toEqual('0');
  });

  it('should format number for thousands', () => {
    const res = pipe.transform(1000);
    expect(res).toEqual('1K');
  });

  it('should format number for millions', () => {
    const res = pipe.transform(1000000);
    expect(res).toEqual('1M');
  });

  it('should format number for billions', () => {
    const res = pipe.transform(1000000000);
    expect(res).toEqual('1B');
  });

  it('should format number for trillions', () => {
    const res = pipe.transform(1000000000000);
    expect(res).toEqual('1T');
  });

  it('should format number for Quadrillion', () => {
    const res = pipe.transform(1000000000000000);
    expect(res).toEqual('1Q');
  });

  it('should prepend - if negative', () => {
    const res = pipe.transform(-1000);
    expect(res).toEqual('-1K');
  });
});
