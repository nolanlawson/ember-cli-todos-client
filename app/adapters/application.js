import DS from 'ember-data';

/*export default DS.RESTAdapter.extend({
  host: 'http://localhost:1337'
});*/

var remote = new PouchDB('http://localhost:5984/ember-todos');
var db = new PouchDB('todos');

function doSync() {
  db.sync(remote, {live: true}).on('error', function (err) {
    setTimeout(doSync, 1000); // retry
  });
}
doSync();

export default EmberPouch.Adapter.extend({
  db: db
});
