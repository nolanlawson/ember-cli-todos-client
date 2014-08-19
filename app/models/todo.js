// models/todo.js
import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean'),
  author: DS.belongsTo('author', {async: true})
});

export default Todo;
