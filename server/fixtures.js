if (Posts.find().count() === 0) {
	Posts.insert({
		title: 'FUCK YOU', 
		author: 'Some stuff',
		url: 'http://stackoverflow.com/questions/14429175/meteor-templates-not-working' 
	}); 

	Posts.insert({
		title: 'FUCK YOU 2', 
		author: 'Some stuff 2',
		url: 'http://stackoverflow.com/questions/14429175/meteor-templates-not-working'
	}); 

	Posts.insert({
		title: 'FUCK YOU 3', 
		author: 'Some stuff 3',
		url: 'http://stackoverflow.com/questions/14429175/meteor-templates-not-working' 
	}); 
} 