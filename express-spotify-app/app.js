const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var SpotifyWebApi = require('spotify-web-api-node');

var clientId = 'ab6c172ef15e435987a45a86f98165b3';
var clientSecret = 'cbc297c722e44b2a887b884b6c525007';

var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

//Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function (err) {
    console.log('Quel horreur ! Summit went rong when returning access token', err);
  });

app.get('/', (req, res) => {
  res.render('homepage')
});

app.get('/artists', (req, res) => {
  res.render('artists', { artists: [{ name: 'Drake' }, { name: 'Madonna' }] })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))