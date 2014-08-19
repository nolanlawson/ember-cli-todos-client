// models/author.js
import DS from 'ember-data';

var Author = DS.Model.extend({
  name: DS.attr('string'),
  todos: DS.hasMany('todo', {async: true})
});

export default Author;
