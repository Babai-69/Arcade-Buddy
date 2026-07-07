fetch('https://arcade-buddy.onrender.com/api/notify-query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@example.com',
    profileUrl: 'http://test',
    queryType: 'Test',
    message: 'Testing email',
    attachments: []
  })
}).then(res => res.json()).then(console.log).catch(console.error);
