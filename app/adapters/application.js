import DS from 'ember-data';

/*export default DS.RESTAdapter.extend({
  host: 'http://localhost:1337'
});*/

export default EmberPouch.Adapter.extend({
  db: new PouchDB('http://localhost:5984/foobarbazman')
});
