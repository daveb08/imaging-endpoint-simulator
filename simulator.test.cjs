const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(__dirname + '/index.html', 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const canvas = new Proxy({}, {get: () => () => {}});
const elements = new Map();
const document = {querySelectorAll:()=>[], getElementById(id) {
  if (!elements.has(id)) elements.set(id, {addEventListener:()=>{}, width:1140, height:320, getContext:()=>canvas, querySelectorAll:()=>[]});
  return elements.get(id);
}};
const model = vm.createContext({document});
vm.runInContext(source, model);
test('reader conversion, visit propagation and equal-arm planning', () => {
  assert.equal(model.P.reader, Number((18.7 / (2 * 1.96 * Math.SQRT2)).toFixed(1)));
  assert.equal(model.variance().rescan, 50);
  assert.equal(model.variance().site, 0);
  assert.ok(Math.abs(model.sigmaTotal() ** 2 - 802.12) < 1e-9);
  assert.equal(model.requiredN(80), 56);
  assert.equal(model.requiredN(90), 75);
});
function presetStats(preset) {
  Object.assign(model.P, preset.v);
  model.render();
  return Array.from(elements.get('stats').innerHTML.matchAll(/class="v">([^<]+)/g), match => match[1]);
}
test('fixed-seed preset metrics', () => {
  const rows = model.PRESETS.map(presetStats);
  assert.deepEqual(Array.from(rows), [['56','43%','24%'], ['109','45%','31%'], ['14.5%','71.0%','100.0%'], ['17.1%','65.9%','99.9%']]);
  assert.deepEqual(model.PRESETS.map(presetStats), rows);
  assert.equal(model.variance().rescan, 25);
  assert.equal(model.variance().site, 441);
});
