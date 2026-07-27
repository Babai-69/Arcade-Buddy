const fs = require('fs');

const csvData = `Badge Name,Category,Difficulty Level,Estimated Credits Required,Estimated Completion Time (Hours),Prerequisites,Learning Path,Status,Completion Date,Notes
Analyze BigQuery Data in Connected Sheets,Analytics,Easy,3,3,Google Sheets basics,Data Analytics ? BigQuery,Not touched,,
Analyze Images with the Cloud Vision API,AI,Easy,3,3,Basic API knowledge,AI & ML ? Vision AI,Not touched,,
Analyze Sentiment with Natural Language API,AI,Easy,3,3,Basic API knowledge,AI & ML ? NLP,Not touched,,
App Building with AppSheet,Application Development,Easy,3,4,None,Application Development ? No-Code,Not touched,,
Build a Website on Google Cloud,Application Development,Easy,3,4,HTML/CSS basics,Application Development ? Web,Not touched,,
Cloud Speech API: 3 Ways,AI,Easy,3,3,Basic API knowledge,AI & ML ? Speech,Not touched,,
Create and Manage Cloud SQL for PostgreSQL Instances,Data,Easy,3,4,PostgreSQL basics,Data ? Cloud SQL,Not touched,,
Derive Insights from BigQuery Data,Analytics,Easy,3,4,SQL basics,Analytics ? BigQuery,Not touched,,
Develop AI-Powered Prototypes in Google AI Studio,AI,Easy,3,4,None,AI & ML ? Generative AI,Not touched,,
Develop with Apps Script and AppSheet,Application Development,Easy,3,4,Google Workspace basics,Application Development ? No-Code,Not touched,,
Explore Generative AI with the Gemini API in Vertex AI,AI,Easy,3,4,None,AI & ML ? Generative AI,Not touched,,
Get Started with API Gateway,APIs,Easy,3,3,Basic API knowledge,APIs ? Gateway,Not touched,,
Get Started with Cloud Storage,Infrastructure,Easy,3,3,None,Infrastructure ? Storage,Not touched,,
Get Started with Dataplex,Data,Easy,3,3,None,Data Analytics ? Dataplex,Not touched,,
Get Started with Eventarc,Application Development,Easy,3,3,Basic GCP knowledge,Application Development ? Events,Not touched,,
Get Started with Google Workspace Tools,Application Development,Easy,2,2,None,Application Development ? Workspace,Not touched,,
Get Started with Looker,Analytics,Easy,3,3,None,Analytics ? Looker,Not touched,,
Get Started with Pub/Sub,Data,Easy,3,3,None,Data Analytics ? Pub/Sub,Not touched,,
Get Started with Sensitive Data Protection,Security,Easy,3,3,None,Security ? DLP,Not touched,,
Kickstarting Application Development with Gemini Code Assist,Application Development,Easy,3,4,Basic programming,Application Development ? AI-Assisted,Not touched,,
Monitor and Manage Google Cloud Resources,Infrastructure,Easy,3,3,GCP fundamentals,Infrastructure ? Monitoring,Not touched,,
Monitoring in Google Cloud,DevOps,Easy,3,3,GCP fundamentals,DevOps ? Monitoring,Not touched,,
Networking Fundamentals on Google Cloud,Networking,Easy,3,4,None,Networking ? Fundamentals,Not touched,,
Prepare Data for Looker Dashboards and Reports,Analytics,Easy,3,4,Looker basics,Analytics ? Looker,Not touched,,
Prepare Data for ML APIs on Google Cloud,AI,Easy,3,4,Basic GCP and Python,AI & ML ? Data Prep,Not touched,,
Prompt Design in Vertex AI,AI,Easy,3,3,None,AI & ML ? Prompt Engineering,Not touched,,
Set Up a Google Cloud Network,Networking,Easy,3,3,None,Networking ? Setup,Not touched,,
Set Up an App Dev Environment on Google Cloud,Application Development,Easy,3,3,None,Application Development ? Setup,Not touched,,
Share Data Using Google Data Cloud,Data,Easy,3,3,BigQuery basics,Data Analytics ? Sharing,Not touched,,
Store Process and Manage Data on Google Cloud - Console,Infrastructure,Easy,3,4,GCP fundamentals,Infrastructure ? Storage,Not touched,,
Tag and Discover BigLake Data,Data,Easy,3,3,BigQuery basics,Data ? Governance,Not touched,,
The Basics of Google Cloud Compute,Infrastructure,Easy,2,2,None,Infrastructure ? Compute,Not touched,,
Use APIs to Work with Cloud Storage,APIs,Easy,3,3,Basic API knowledge,APIs ? Cloud Storage,Not touched,,
Use Functions Formulas and Charts in Google Sheets,Application Development,Easy,2,2,Google Sheets basics,Application Development ? Workspace,Not touched,,
Use Machine Learning APIs on Google Cloud,AI,Easy,3,4,Basic API knowledge,AI & ML ? APIs,Not touched,,
Using the Google Cloud Speech API,AI,Easy,3,3,Basic API knowledge,AI & ML ? Speech,Not touched,,
`;

let output = 'export const RECOMMENDED_LABS = [\n';
const lines = csvData.trim().split('\n').slice(1);
lines.forEach(line => {
  const parts = line.split(',');
  if (parts.length >= 7 && parts[0]) {
     output += `  { name: "${parts[0]}", category: "${parts[1]}", difficulty: "${parts[2]}", time: "${parts[4]} Hours" },\n`;
  }
});
output += '];\n';

fs.writeFileSync('src/data/roadmapData.ts', output);
