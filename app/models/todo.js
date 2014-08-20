// models/todo.js
import DS from 'ember-data';

var Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean'),
  rev: DS.attr('string'),
  author: DS.belongsTo('author')
});

export default Todo;
