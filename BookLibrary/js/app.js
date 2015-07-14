var app = app || {};
$(function(){
	var books = [{
		title: 'Javascript: AAA',
		author: 'AAA',
		releaseDate: '2008',
		keywords: 'Javascript Programming'
	},{
		title: 'Javascript: BBB',
		author: 'BBB',
		releaseDate: '2008',
		keywords: 'Javascript Programming'
	},{
		title: 'Javascript: CCC',
		author: 'CCC',
		releaseDate: '2008',
		keywords: 'Javascript Programming'
	},{
		title: 'Javascript: DDD',
		author: 'DDD',
		releaseDate: '2008',
		keywords: 'Javascript Programming'
	},{
		title: 'Javascript: WWW',
		author: 'WWW',
		releaseDate: '2008',
		keywords: 'Javascript Programming'
	},{
		title: 'Javascript: WWW',
		author: 'WWW',
		releaseDate: '2008',
		keywords: 'Javascript Programming'
	}];

	new app.LibraryView(books);
});