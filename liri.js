var myKeys = require("./keys.js");
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var twitterKeys = myKeys.twitterKeys;
var spotifyKeys = myKeys.spotifyKeys;

var command = process.argv[2];
var item = "";

for (var i = 3; i < process.argv.length; i++) {
  item += process.argv[i]+" ";
}
console.log(item);



var myTweets = function(){

  var client = new twitter(twitterKeys);
  var params = {screen_name: 'meero_meemo', count: 10};
  var fileData = ""
  
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      console.log(error)
    }
    else{
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        fileData+= tweets[i].text+"\r";
      }

      fs.appendFile("log.txt", fileData+"\r", function(err){  
        if(err) throw err;
        console.log("The data was added to the file");
      });
    }
  });

}

var spotifyThisSong = function(songItem){

  var spotify = new Spotify(spotifyKeys);
  var songSearchItem = "happier";
  if(songItem)
    songSearchItem = songItem;
 
  spotify.search({ type: 'track', query: songSearchItem, limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("The Singer: "+data.tracks.items[0].artists[0].name); 
    console.log("The Song Name: "+data.tracks.items[0].name); 
    console.log("Song Preview: "+data.tracks.items[0].preview_url); 
    console.log("The Album Name: "+data.tracks.items[0].album.name);

    var fileData = "The Singer: "+data.tracks.items[0].artists[0].name+"\r"
                  +"The Song Name: "+data.tracks.items[0].name+"\r"
                  +"Song Preview: "+data.tracks.items[0].preview_url+"\r" 
                  +"The Album Name: "+data.tracks.items[0].album.name+"\r"+"\r";

      fs.appendFile("log.txt", fileData, function(err){
          if(err) throw err;
          console.log("The data was added to the file");
        });
  });

}

var movieThis = function(movieItem){

 var movieSearchItem = "Mr. Nobody."; 
 if(movieItem)
   movieSearchItem = movieItem;

  var queryUrl = "http://www.omdbapi.com/?t=" + movieSearchItem+ "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body){
    if (!error && response.statusCode === 200){
      console.log("Title: "+JSON.parse(body).Title);
      console.log("Year: "+JSON.parse(body).Year);
      console.log("IMDB Rating: "+JSON.parse(body).Ratings[0].Value);
      console.log("Rotten Tomato Rating: "+JSON.parse(body).Ratings[1].Value);
      console.log("Language: "+JSON.parse(body).Language);
      console.log("Country: "+JSON.parse(body).Country);
      console.log("Plot: "+JSON.parse(body).Plot);
      console.log("Actors: "+JSON.parse(body).Actors);

      var fileData = "Title: "+JSON.parse(body).Title+"\r"
                    +"Year: "+JSON.parse(body).Year+"\r"
                    +"IMDB Rating: "+JSON.parse(body).Ratings[0].Value+"\r"
                    +"Rotten Tomato Rating: "+JSON.parse(body).Ratings[1].Value+"\r"
                    +"Language: "+JSON.parse(body).Language+"\r"
                    +"Country: "+JSON.parse(body).Country+"\r"
                    +"Plot: "+JSON.parse(body).Plot+"\r"
                    +"Actors: "+JSON.parse(body).Actors+"\r"+"\r";

      fs.appendFile("log.txt", fileData, function(err){
          if(err) throw err;
          console.log("The data was added to the file");
      });

    }
  });

}

var doWhatItSays = function(){

    fs.readFile("random.txt", 'utf8', (err, data)=>{

      if (err) throw err;
      var dataArr = data.split(",");
      doThis(dataArr[0], dataArr[1]);
    });
}

var doThis = function(command, item){

  switch(command){

    case "my-tweets": 
      myTweets();
      break;

    case "spotify-this-song":
      spotifyThisSong(item);
      break;

    case "movie-this":
      movieThis(item);
      break;

    case "do-what-it-says":
      doWhatItSays();
      break;
  }

}

doThis(command, item);





