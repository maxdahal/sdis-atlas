import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { filterCourses, readSaved } from '../.test-build/courses.js';
const courses = JSON.parse(readFileSync(new URL('../src/data/courses.json', import.meta.url), 'utf8'));
const empty = { query: '', department: '', level: '', credits: '' };
test('search accepts compact codes and Atlas skill keywords', () => {
  assert.equal(filterCourses(courses, {...empty, query:'inls523'})[0].code, 'INLS 523');
  assert.ok(filterCourses(courses, {...empty, query:'SQL'}).some(c=>c.code==='INLS 523'));
});
test('filters combine and impossible combinations are empty', () => {
  assert.deepEqual(filterCourses(courses,{...empty,department:'DATA',credits:'1'}).map(c=>c.code),['DATA 291']);
  assert.equal(filterCourses(courses,{...empty,department:'INLS',credits:'1'}).length,0);
  assert.ok(filterCourses(courses,{...empty,level:'500'}).every(c=>c.level===500));
});
test('saved storage handles malformed and duplicate data', () => {
  assert.deepEqual(readSaved('broken'),[]); assert.deepEqual(readSaved('{}'),[]);
  assert.deepEqual(readSaved('["inls-151",4,"inls-151"]'),['inls-151']);
});
test('catalog data has required provenance, descriptions, and unique IDs', () => {
  assert.equal(courses.length,16); assert.equal(new Set(courses.map(c=>c.id)).size,16);
  for(const c of courses){assert.ok(c.description.length>30);assert.match(c.sourceUrl,/^https:\/\/catalog.unc.edu\/courses\/(inls|data)\/$/);assert.equal(c.catalogYear,'2026–2027');}
  assert.equal(courses.find(c=>c.code==='DATA 317')?.prerequisites,'Prerequisites, DATA 110 and DATA 117.');
});
