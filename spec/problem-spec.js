
var problem = require('../src/index').problem;

describe('The sample.problem function', function() {
  it('can provide a problem summary', function() {
    expect(problem(new Error('oops')).summarize().problems$sum).toEqual(1);
    expect(problem(new Error('oops')).summarize().time$min).not.toBeGreaterThan(Date.now());
    expect(problem(new Error('oops')).summarize().time$min).toBeGreaterThan(Date.now()-100);
    expect(problem(new Error('oops')).summarize().time$max).not.toBeGreaterThan(Date.now());
    expect(problem(new Error('oops')).summarize().time$max).toBeGreaterThan(Date.now()-100);
  });

  it('returns a problem event', function() {
    expect(problem(new Error('oops')).type).toEqual('problem');
    expect(problem(new Error('oops')).message).toEqual('oops');
    expect(problem(new Error('oops')).time).not.toBeGreaterThan(Date.now());
    expect(problem(new Error('oops')).time).toBeGreaterThan(Date.now()-100);
  });
});