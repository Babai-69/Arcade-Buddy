import fs from 'fs';
async function run() {
  const res = await fetch('https://rsvp.withgoogle.com/events/arcade-facilitator/home');
  const text = await res.text();
  fs.writeFileSync('rsvp.html', text);
}
run();
