const express = require('express');
const app = express();
const port = 3001;
const unirest = require("unirest");
// Tweeter Authentication details
const consumer_key = 'IvPwHxzETcz6VlujX842mNrel'
const consumer_secret = 'hNF83pMPQ6CTuOiBKriCHKlBLQmJurb8a8KJGWW88ZqQlSsYn0'
const access_token = '1358746918994681860-oIlbFumKwyCrJr2DGxuu2pd3kz6K5W'
const access_token_secret = '77hciGvnhlVW6leK4VWfgkOSL8ZQE24F9AUFQevkpXzlN'

//OAuth Step 1

app.get('/api/associations/:word', (req, res) => {
  const request = unirest("GET", "/2/tweets/search/recent/");
  request.query({ "entry": req.params.word });
  request.headers({
    "x-rapidapi-host": "",
    "x-rapidapi-key": "",
    "useQueryString": true
  });
  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.json(response.body.associations_scored || {});
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});