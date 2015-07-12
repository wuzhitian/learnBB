//整个任务管理的视图，包含功能如控制项目状态过滤
var app = app || {};
var app.AppView = Backbone.View.extend({
	tagName: '#todoapp',

	statsTemplate: _.template($("#stats-template")),

	events: {

	},

	initialize: function(){
		this.allCheckBox = this.$("#toggle-all")[0];
		this.$input = this.$("#new-todo");
		this.$footer = this.$("#footer");
		this.$main = this.$("#main");

	},

	render: function(){
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if(app.Todos.length){
			this.$footer.show();
			this.$main.show();

			this.$footer.html(statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$("#filter li a").removeClass("selected")
								  .filter('[href="#/'+ (app.TodoFlter || '') +'"]')
								  .addClass('selected');
		}else{
			this.$footer.hide();
			this.$main.hide();
		}

		this.allCheckBox.checked = !remaining;
	},

	addOne: function(todo){
		var view = new app.TodoView({model: todo});
		$("#todo-list").append(view.render().el);
	},

	addAll: function(){
		app.Todos.each(this.addOne, this);
	},

	filterOne: function(todo){
		todo.trigger('visible');
	}

});