var app = app || {};

app.TodoView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($("#item-template").html()),

	events: {
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close',

		'click .toggle': 'togglecompleted',
		'click .destroy': 'clear'
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);

		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.$input = this.$('.edit');
		// .toggleClass( className, switch )
		// className: 在匹配的元素集合中的每个元素上用来切换的一个或多个（用空格隔开）样式类名。
		// switch: 一个布尔值，用于判断样式是否应该被添加或移除。
		// 
		//第二个参数判断样式类是否应该被添加或删除。
		//如果这个参数的值是true，那么这个样式类将被添加;如果这个参数的值是false，那么这个样式类将被移除。
		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();

		return this;
	},

	toggleVisible: function(){
		this.$el.toggleClass('hidden', this.isHidden());
	},

	isHidden: function(){
		var isCompleted = this.model.get('completed');
		return ((!isCompleted && app.TodoFilter === 'completed') 
			|| (isCompleted && app.TodoFilter === 'active'));
	},

	togglecompleted: function(){
		//////////////What
		this.model.toggle();
	},

	edit: function(){
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function(){
		var value = this.$input.val().trim();

		if(value){
			this.model.save({title: value});
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