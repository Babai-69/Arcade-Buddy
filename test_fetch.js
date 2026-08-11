const url = "http://localhost:3000/api/calculator?url=https://www.skills.google/public_profiles/7a0c9c4d-4215-4f16-a18c-47784257bde1";
fetch(url).then(res => res.json()).then(console.log).catch(console.error);
