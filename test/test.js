'use strict';
const resolver = require('../index');
const rootFolder = 'eslint-import-resolver-amd';
describe('resolver', () => {
  it('resolver is not empty', () => {
    resolver.should.have.properties('resolve');
    resolver.resolve.should.be.type('function');
  });
  it('resolve with empty config', () =>
      resolver.resolve({}, 'index.js', 'jquery-netu', rootFolder).should.be.equal(`${rootFolder}/jquery-netu.js`)
  );
  it('resolve with base url', () =>
  resolver.resolve({
    baseUrl: 'assets'},
    'index.js', 'jquery-netu', rootFolder).should.be.equal(`${rootFolder}/assets/jquery-netu.js`)
  );
  it('resolve with root dir path', () =>
  resolver.resolve({
    baseUrl: 'assets',
    paths: {app: '../app'}},
    'index.js', 'app', rootFolder).should.be.equal(`${rootFolder}/app.js`)
  );
  it('resolve with special path and empty baseUrl', () =>
  resolver.resolve({
    paths: {foo: 'lib/foo2'},
  }, 'index.js', 'foo', rootFolder).should.be.equal(`${rootFolder}/lib/foo2.js`)
  );
  it('resolve with special path', () =>
  resolver.resolve({
    baseUrl: 'assets',
    paths: {foo: 'lib/foo2'},
  }, 'index.js', 'foo', rootFolder).should.be.equal(`${rootFolder}/assets/lib/foo2.js`)
  );
  it('resolve with /**.js absolute path', () =>
      resolver.resolve({
        baseUrl: 'assets',
        paths: {foo: 'lib/foo2'},
      }, 'index.js', '/foo.js', rootFolder).should.be.equal('/foo.js')
  );
  it('resolve with / absolute path', () =>
      resolver.resolve({
        baseUrl: 'assets',
        paths: {foo: 'lib/foo2'},
      }, 'index.js', '/foo', rootFolder).should.be.equal('/foo')
  );
  it('resolve with .js path', () =>
      resolver.resolve({
        baseUrl: 'assets',
        paths: {foo: 'lib/foo2'},
      }, 'index.js', 'foo.js', rootFolder).should.be.equal(`${rootFolder}/foo.js`)
  );
  it('resolve bundles', () =>
      resolver.resolve({
        baseUrl: 'assets',
        bundles: {
          secondary: ['foo4', 'foo3', 'foo5'],
          primary: ['foo1', 'foo2', 'foo'],
        },
      }, 'index.js', 'foo1', rootFolder).should.be.equal(`${rootFolder}/assets/primary.js`)
  );
  it('resolve bundles only', () =>
      resolver.resolve({
        bundles: {
          secondary: ['foo4', 'foo3', 'foo5'],
          primary: ['foo1', 'foo2', 'foo'],
        },
      }, 'index.js', 'foo1', rootFolder).should.be.equal(`${rootFolder}/primary.js`)
  );
  it('resolve map', () =>
      resolver.resolve({
        baseUrl: 'assets',
        map: {
          'some/oldmodule': {
            foo: 'foo1.0',
          },
          index: {
            foo: 'foo1.2',
          },
        },
      }, 'index.js', 'foo', rootFolder).should.be.equal(`${rootFolder}/assets/foo1.2.js`)
  );
});
