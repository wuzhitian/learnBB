var app = app || {};
var TodoList = Backbone.Collection.extend({
	model: app.Todo,

	localStorage: new Backbone.LocalStorage('todos-backbone'),

	completed: function(){
		return this.filter(function(todo){
			return todo.get('completed');
		});
	},

	remaining: function(){
		//this.without.apply(this, this.completed); 为了将需要过滤的参数,数组化传进without();
		//借助apply([thisObj[,argArray]])
		//this.without(1, 2, 3);
		//this.without.apply(this, [1, 2, 3]);

		return this.without.apply(this, this.completed());
		//return _.without(this, this.completed());
	},

	nextOrder: function(){
		if(!this.length){
			return 1;
		}else{
			return this.last().get('order') + 1;
		}
	},

	comprator: function(todo){
		return todo.get('order');
	}
});

app.Todos = new TodoList();