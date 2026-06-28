const https = require('https');
https.get('https://arcadepointscalci.in/calculator', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/(\d+)\s*\/\s*(\d+)/gi);
    console.log("From arcadepointscalci.in:", matches);
  });
}).on('error', console.error);

https.get('https://rsvp.withgoogle.com/events/arcade-facilitator-2024/home', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/.{0,20}spots? left.{0,20}/gi);
    console.log("From rsvp (home):", matches);
  });
}).on('error', console.error);
