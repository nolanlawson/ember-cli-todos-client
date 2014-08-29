import DS from 'ember-data';

/*export default DS.RESTAdapter.extend({
  host: 'http://localhost:1337'
});*/

var db = new PouchDB('todos');
export default EmberPouch.Adapter.extend({
  db: db
});

db.sync('http://localhost:5984/todos-ember', {live: true});