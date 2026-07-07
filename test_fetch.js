fetch('https://discuss.google.dev/tag/learning.json')
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data.topic_list.topics.slice(0, 3), null, 2)))
  .catch(console.error);
