// routes/todos.js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  },
  afterModel: function (recordArray) {
    new PouchDB('todos').changes({since: 'now', live: true}).on('change', function () {
      recordArray.update();
    });
  }
});
