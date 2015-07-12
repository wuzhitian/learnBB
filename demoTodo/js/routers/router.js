var Workspace = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function(param){
		//param Url传过来的参数
		//如：a链接 <a href="#/completed">completed</a>,被点击时, param为completed
		
		window.app.TodoFilter = param || '';
		window.app.Todos.trigger('filter');
	}
});
app.TodoRouter = new Workspace();
Backbone.history.start();