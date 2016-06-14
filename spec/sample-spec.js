'use strict';

const sample = require('../src/index').sample;

describe('The sample function', function() {
  it('can report a sample summary', function() {
    const s = sample( {
      myValue : {
        value : 5, 
        unit : 'seconds',
        interpretation : 'myValue in seconds'
      },
      kittens : {
        value : 2,
        unit : 'felines',
        interpretation : 'number of kittens in household'
      }} );

    expect(s.summarize().values.myValue.$min).toEqual(5);
    expect(s.summarize().values.myValue.$max).toEqual(5);
    expect(s.summarize().values.myValue.$avg.avg).toEqual(5);
    expect(s.summarize().values.myValue.$avg.size).toEqual(1);
    expect(s.summarize().values.kittens.$min).toEqual(2);
    expect(s.summarize().values.kittens.$max).toEqual(2);
    expect(s.summarize().values.kittens.$avg.avg).toEqual(2);
    expect(s.summarize().values.kittens.$avg.size).toEqual(1);
    expect(s.summarize().values.timestamp.$min).not.toBeGreaterThan(Date.now());
    expect(s.summarize().values.timestamp.$min).toBeGreaterThan(Date.now()-100);
    expect(s.summarize().values.timestamp.$max).not.toBeGreaterThan(Date.now());
    expect(s.summarize().values.timestamp.$max).toBeGreaterThan(Date.now()-100);

    expect(s.summarize().values.kittens.unit$set).toEqual(['felines']);
    expect(s.summarize().values.kittens.interpretation$set).toEqual(['number of kittens in household']);
  });

  it('returns a sample event', function() {
    const s = sample( {
      myValue : {
        value : 5,
        unit : 'seconds',
        interpretation : 'myValue in seconds' }
    });

    expect(s.type).toEqual('sample');
    expect(s.values.myValue.value).toEqual(5);
    expect(s.values.timestamp.value).not.toBeGreaterThan(Date.now());
    expect(s.values.timestamp.value).toBeGreaterThan(Date.now()-100);
  });

  it('does not accept various bogus values', function() {
    expect(() => sample('foo')).toThrow();
    expect(() => sample(5)).toThrow();
    expect(() => sample({ foo: {}})).toThrow();
    expect(() => sample({ foo: { value: 'foo' }})).toThrow();
  });
});
