Bitly = {}; 


Bitly.shortenURL = function(url) {

	console.log('shortenURL fired'); 
	console.log(Meteor.settings.bitly);

	if(!Meteor.settings.bitly) {
		throw new Meteor.Error(500, 'Please provide a Bitly token in Meteor.settings [shortenUrl]');
	}

	var shortenResponse = Meteor.http.get(
		"https://api-ssl.bitly.com/v3/shorten?", 
		{
			timeout: 5000,
			params: {
				"format": "json", 
				"access_token": Meteor.settings.bitly, 
				"longUrl": url 
			}
		}
	);

	if(shortenResponse.statusCode === 200) {
		return shortenResponse.data.data.url; 
	} else {
		throw new Meteor.Error(500, "Bitly call failed with error: " + shortenResponse.status_text); 
	}
}

Bitly.getClicks = function(link) {
	if(!Meteor.settings.bitly) {
		throw new Meteor.Error(500, 'Please provide a Bitly token in Meteor.settings [getClicks]'); 
	}

	var statsResponse = Meteor.http.get(
		"https://api-ssl.bitly.com/v3/link/clicks?",
		{
			timeout: 5000,
			params: {
				"format":"json", 
				"access_token": Meteor.settings.bitly, 
				"link":link 
			}
		}
	);

	if(statsResponse.data.status_code === 200) {
		return statsResponse.data.data.link_clicks

	}

}

Meteor.methods({
	'getBitlyClicks':function(link) {
		check(link, String);
		return Bitly.getClicks(link); 
	}
}); 

var callInterval = 10000; 

Meteor.setInterval(function(){

	//get all posts with short URL property

	var shortUrlPosts = Posts.find({shortUrl: {$exists:true}}); 
	var postsNumber = shortUrlPosts.count(); 

	//intialize counter
	var count = 0; 

	//calculate correct delay for each value throughout the interval 
	shortUrlPosts.forEach(function(post){
		console.log(post.title + ' ' + post._id + ' ' + post.shortUrl);
		var callTimeout = Math.round(callInterval/postsNumber*count); 
		Meteor.setTimeout(function(){
			Posts.update(post._id, {$set: {clicks: Bitly.getClicks(post.shortUrl)}});
		}, callTimeout);
		count++; 
	}); 

	console.log('----------------');

}, callInterval); 











































