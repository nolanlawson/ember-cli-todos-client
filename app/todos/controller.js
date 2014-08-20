// controllers/todos.js
import Ember from 'ember';

var isEmpty  = Ember.isEmpty;
var filterBy = Ember.computed.filterBy;
var notEmpty = Ember.computed.notEmpty;

export default Ember.ArrayController.extend({
  active:    filterBy('@this', 'isCompleted', false),
  completed: filterBy('@this', 'isCompleted', true),
  hasCompleted: notEmpty('completed.[]'),

  inflection: function () {
    var active = this.get('active.length');
    return active === 1 ? 'item' : 'items';
  }.property('active.[]'),

  allAreDone: function (key, value) {
    if (arguments.length === 2) {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    } else {
      return !isEmpty(this) && this.get('length') === this.get('completed.length');
    }
  }.property('@each.isCompleted'),

  actions: {
    createTodo: function () {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (title && !title.trim()) {
        this.set('newTitle', '');
        return;
      }

      var author = this.store.createRecord('author', {
        name: 'Some author #' + Math.random()
      });

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });


      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save().then(function () {
        return author.save();
      }).then(function () {
        todo.set('author', author);
        return todo.save();
      }).then(function () {
        author.set('todos').pushObject(todo);
        return author.save();
      }).catch(function (err) {
        console.log(err);
      });

    },

    clearCompleted: function () {
      var completed = this.get('completed');

      completed.toArray().forEach(function (todo) {
        todo.deleteRecord();
        todo.save();
      });
    }
  }
});
