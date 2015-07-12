//单个任务的视图

var app = app || {};
app.TodoView = Backbone.View.extend({
	tagName: "li",

	template: _.template($("#item-template").html()),

	events: {
		'dblclick .edit': 'edit',
		'keydown .edit': 'updateOnEnter',
		'blur .edit': 'close',

		'click .toggle': 'toggleCompleted',
		'click .destroy': 'clear'
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.$input = this.$(".edit");
		this.$el.toggleClass('completed', this.model.get('completed'));

		return this;
	},

	toggleVisible: function(){
		this.$el.toggleClass('hidden', this.isHidden());
	},
	/**
	 * 通过判断this.model.get('completed'),决定该条目是否需要隐藏;
	 * @return {Boolean} true:隐藏; false: 不隐藏;
	 */
	isHidden: function(){
		var isCompleted = this.model.get('completed');
		//过滤当前任务条目的状态
		//var a = (!isCompleted && app.TodoFilter === 'completed');
		//如果是未完成的条目，则!isCompleted为true, 当路由参数为'completed'时, a = true, 隐藏该条目;
		//如果是已完成的条目，则!isCompleted为false, 当路由参数为'completed'时, a = false, 不隐藏该条目
		
		//var b = (isCompleted && app.TodoFilter === 'active');
		//如果是未完成的条目，则isCompleted为false, 当路由参数为'active'时, b = false, 不隐藏该条目;
		//如果是已完成的条目，则isCompleted为true, 当路由参数为'active'时, b = true, 隐藏该条目;
		
		//功能总结:
		//当路由参数为'completed'时,isCompleted为true的条目,返回false(--> 不隐藏); isCompleted为false的条目,返回true(--> 隐藏);
		//当路由参数为'active'时, isCompleted为true的条目, 返回true(--> 隐藏); isCompleted为false的条目, 返回false(--> 不隐藏);

		return ((!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active'));

	},

	toggleCompleted: function(){
		this.model.toggle();
	},

	edit: function(){
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function(){
		var value = this.$input.val().trim();
		if(value){
			this.model.save({
				title: value
			});
		}
		this.$el.removeClass('editing');
	},

	updateOnEnter: function(event){
		if(event.which === ENTER_KEY){
			this.close();
		}
	},

	clear: function(){
		this.model.destroy();
	}
});