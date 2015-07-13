[TOC]

### 模型验证
验证函数: .validate()
如果提供的属性都是有效的，.validate()不会反回任何值; 
相反，如果参数是无效的，就会返回一个错误值。
如果有错误值反回，则
model会触发invalid事件，同时会将.validate()的返回值赋值给validationError属性.
.save()不会继续执行，同时model上的属性不会服务器上修改.

```javascript
	var Todo = Backbone.Model.extend({
		defaults: {
			completed: false
		},
		validate: function(attrs){
			if(attrs.title === undefined){
				return 'Remember to set a title for your todo.';
			}
		},
		initialize: function(){
			console.log('This model has been initialized.');
			this.on('invalid', function(model, errMsg){
				console.log(errMsg);
			});
		}
	});

	var myTodo = new Todo();

	myTodo.set('completed', true);
	console.log(myTodo.get('completed'));
	// log: true
	
	myTodo.set('completed', false, {validate: true});
	// log: Remember to set a title for your todo.
	console.log(myTodo.get('completed'));
	// log: true
	
	myTodo.set({
		title: 'new Title',
		completed: false
	},{validate: true});
	console.log(JSON.stringify(myTodo));
	// log: {"completed":false,"title":"new Title"}
```