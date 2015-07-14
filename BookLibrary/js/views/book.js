var app = app || {};
app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: _.template($("#booktemplate").html()),

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});