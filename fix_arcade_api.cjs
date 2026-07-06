const fs = require('fs');
let content = fs.readFileSync('src/utils/arcadeApi.ts', 'utf8');

content = content.replace("const data = await response.json();", `const contentType = response.headers.get("content-type");
    if (!contentType || contentType.indexOf("application/json") === -1) {
      const text = await response.text();
      console.error("API returned non-JSON:", text.substring(0, 100));
      return [];
    }
    const data = await response.json();`);

fs.writeFileSync('src/utils/arcadeApi.ts', content);
