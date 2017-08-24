console.log('this is loaded');

// exports.twitterKeys = {
//   consumer_key: '1IToWB6HHWCsEzPDUj6dWdQTV',
//   consumer_secret: 'bGOU9st12JyzVn1XC96iHnTClXH2MfmsK3HzPBpNO4qQ7fvHUY',
//   access_token_key: '898245428449206272-f3CGIENHKsNiIFCp5XNLlrxF855ImyZ',
//   access_token_secret: 'fmxb3SFMQ2Lk49X6HN01874Gbtsc6eVLIw2vWPv7XaW3x',
// }


exports.twitterKeys = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}



// spotify keys
//url: https://www.npmjs.com/package/node-spotify-api
//Client ID: c78d0244b2e74c2f9c6188d6b5557755
//Client Secret: e4c42aecfffe45bd8146af766b723504

exports.spotifyKeys = {
	id: process.env.SPOTIFY_ID,
	secret:process.env.SPOTIFY_SECRET
}


//OMDB 
//API-key: 40e9cece