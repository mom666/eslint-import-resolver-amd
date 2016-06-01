'use strict';
const resolver = require('../index');

describe('resolver', () => {
  it('resolver is not empty', () => {
    resolver.should.have.properties('resolve');
    resolver.resolve.should.be.type('function');
  });
  /*  it('resolve with empty config', () =>
   resolver.resolve({}, 'index.js', 'jquery-netu').should.be.equal('jquery-netu.js')
   );
   it('resolve with empty config', () =>
   resolver.resolve({baseUrl: 'assets'}, 'index.js', 'jquery-netu').should.be.equal('assets/jquery-netu.js')
   );
   it('resolve with empty config', () =>
   resolver.resolve({baseUrl: 'assets', paths: {app: '../app'}}, 'index.js', 'app').should.be.equal('app.js')
   );
   it('resolve with empty config', () =>
   resolver.resolve({
   baseUrl: 'assets',
   paths  : {app: '../app'},
   }, 'index.js', '/jquery-netu').should.be.equal('jquery-netu')
   );*/
});
