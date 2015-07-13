//整个任务管理的视图，包含功能如控制项目状态过滤
var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#todoapp',

	statsTemplate: _.template($("#stats-template").html()),

	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	initialize: function(){
		this.allCheckbox = this.$("#toggle-all")[0];
		this.$input = this.$("#new-todo");
		this.$footer = this.$("#footer");
		this.$main = this.$("#main");
		this.$list = this.$("#todo-list");

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);

		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);	//'filter'在路由跳转的时候触发，window.app.Todos.trigger('filter');
		this.listenTo(app.Todos, 'all', _.debounce(this.render, 0));

        app.Todos.fetch({reset: true});
	},

	render: function(){

		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if(app.Todos.length){
			this.$footer.show();
			this.$main.show();

			this.$footer.html(this.statsTemplate({
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

		this.allCheckbox.checked = !remaining;
	},

	addOne: function(todo){
		var view = new app.TodoView({model: todo});
        this.$list.append(view.render().el);
	},

	addAll: function(){
        this.$("#todo-list").html('');
		app.Todos.each(this.addOne, this);
	},

	filterOne: function(todo){	//控制单项任务的可见性
		todo.trigger("visible");
	},

	filterAll: function(){		//控制全部任务的可见性
		app.Todos.each(this.filterOne, this);
	},

	newAttributes: function(){
		return {
			title: this.$input.val().trim(),
			completed: false,
			order: app.Todos.nextOrder()
		};
	},

	createOnEnter: function(event){
		if(event.which !== ENTER_KEY || !this.$input.val().trim()){
			return;
		}
		app.Todos.create(this.newAttributes());
		this.$input.val('');
	},

	clearCompleted: function(){
		_.invoke(app.Todos.completed(), 'destory');
		return false;
	},

	toggleAllComplete: function(){
		var completed = this.allCheckbox.checked;
        alert(completed);
		app.Todos.each(function(todo){
			todo.save({
				"completed": completed
			});
		});
	}
});