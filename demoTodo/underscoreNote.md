[TOC]
#### each
_.each(list, iteratee, [context])
遍历list中的所有元素，按顺序用遍历输出每个元素。
如果传递了context参数，则把iteratee绑定到context对象上。

```javascript
	var obj = {a:1 ,b:2 ,c:3};
	_.each([1,2,34], function(value, key, list){
		console.log(value, key, list);
	});
	_.each({a:1, b:2, c: 3}, function(value, key, list){
		console.log(value, key, list);
	});

	
	var obj2 = {
		arr: [],
		foo: function(item){
			console.log(this);
		}
	};
	//log: Window;
	_.each(obj, obj2.foo);
	//log: [];
	console.log(obj2.arr);

	var obj3 = {
		arr: [],
		foo: function(item){
			console.log(this);
			this.arr.push(item);
		}
	}
	//log: Object obj3;
	_.each(obj, obj3.foo, obj3);
	//log: [1, 2, 3];
	console.log(obj3.arr);
```

#### filter
_.filter(list, predicate, [context])
遍历list中的每个值，返回包含所有通过predicate真值检测的元素值。

```javascript
	var evens = _.filter([1, 2, 3, 4, 5], function(num){
		return num %2 == 0;
	});
	// log: [2, 4]
	console.log(evens);
```

#### invoke
_.invoke(list, methodName, *arguments) 
在list的每个元素上执行methodName方法。methodName方法是list每个元素上带有的;
任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它。

```javascript
	var arr0 = [[321,12,21,43,234], [432,12312,421, 42,79]];
	var arr1 = _.invoke(arr0, 'sort', function(a, b){
				return a - b;
		});
	//log: [[12, 21, 43, 234, 321], [42, 79, 421, 432, 12312]]
	console.log(arr1);
```

#### toggleClass(className, switch)		//jQuery函数
.toggleClass( className, switch )
className: 在匹配的元素集合中的每个元素上用来切换的一个或多个（用空格隔开）样式类名。
switch: 一个布尔值，用于判断样式是否应该被添加或移除。如果这个参数的值是true，那么这个样式类将被添加;如果这个参数的值是false，那么这个样式类将被移除。

```javascript
	$('#foo').toggleClass(className, addOrRemove);	
	//等价于
	if (addOrRemove) {
	  $('#foo').addClass(className);
	}
	else {
	  $('#foo').removeClass(className);
	}
```