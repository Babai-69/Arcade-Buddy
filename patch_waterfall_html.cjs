const fs = require('fs');
let html = fs.readFileSync('public/tier-waterfall.html', 'utf8');

const oldHeader = `<div id="overlay">
  <div style="max-width: 600px; margin: 0 auto; text-align: center;">
    <h2 style="margin:0 0 10px 0; font-weight:800; font-size:26px;">Waterfall Tier System</h2>
    <p style="margin:0 0 20px 0; color:#cbd5e1; font-size:15px; line-height: 1.5;">Watch how the automated system allocates rewards when slots run out.</p>
  </div>`;

const newHeader = `<div id="overlay">
  <div style="max-width: 600px; margin: 0 auto; text-align: center;">
    <h2 style="margin:0 0 10px 0; font-weight:800; font-size:26px;">Waterfall Tier System</h2>
    <p style="margin:0 0 20px 0; color:#cbd5e1; font-size:15px; line-height: 1.5;">Watch how the automated system allocates rewards when slots run out.</p>
    <div id="demo-explanation" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; margin-bottom: 20px; font-size: 14px; text-align: left; line-height: 1.6; display: none;">
    </div>
  </div>`;

html = html.replace(oldHeader, newHeader);

// Update setScenario to also update the demo explanation text
const oldSetScenario = `function setScenario(s) {
  scenario = s; step = 0; t = 0;
  document.querySelectorAll('button.btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn' + s).classList.add('active');
  document.getElementById('nextBtn').disabled = false;
  document.getElementById('nextBtn').innerText = "Next Step ➡";
}`;

const newSetScenario = `
const explanations = {
  1: [
    "You have successfully earned enough points to qualify for the highly coveted Legend Tier. The system recognizes your achievement.",
    "The system is now scanning the global database to verify if there are any remaining open slots in the Legend Tier. Only 2,500 total slots exist.",
    "Great news! The system found an available slot for you before they ran out.",
    "You have officially secured your spot in the Legend Tier. You are now an Arcade Legend!",
    "As an Arcade Legend, you have first access to claim from the entire inventory of Google Cloud merchandise."
  ],
  2: [
    "You earned enough points for the Legend Tier, but wait... let's see if the slots are still available.",
    "The system is scanning the global database to check the remaining capacity for the Legend Tier.",
    "Oh no! All 2,500 slots for the Legend Tier have already been claimed by other participants who finished earlier.",
    "Because the Legend Tier is full, the system automatically triggers the 'Waterfall'. You are safely cascaded down to the next highest tier (Champion) instead of losing out.",
    "The system now scans the Champion Tier to ensure there is enough capacity (3,000 slots) to accommodate you.",
    "Success! Because you cascaded down from a higher tier, you are placed at the very front of the queue for the Champion Tier.",
    "You have successfully secured your spot in the Champion Tier. Your swag is safe!",
    "This waterfall logic applies continuously down the chain. If Champion is full, it checks Ranger, and so on, always securing the best available tier for you."
  ]
};

function updateExplanation(scen, stp) {
  const el = document.getElementById('demo-explanation');
  if (explanations[scen] && explanations[scen][stp]) {
    el.style.display = 'block';
    el.innerHTML = '<strong style="color: #60a5fa;">Step ' + (stp + 1) + ':</strong> ' + explanations[scen][stp];
  } else {
    el.style.display = 'none';
  }
}

function setScenario(s) {
  scenario = s; step = 0; t = 0;
  document.querySelectorAll('button.btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn' + s).classList.add('active');
  document.getElementById('nextBtn').disabled = false;
  document.getElementById('nextBtn').innerText = "Next Step ➡";
  updateExplanation(scenario, step);
}`;

html = html.replace(oldSetScenario, newSetScenario);

// Update the next step button logic to call updateExplanation
const oldNext = `document.getElementById('nextBtn').addEventListener('click', () => {
  step++;
  t = 0;
  const maxStep = (scenario === 1) ? 4 : 7;
  if(step >= maxStep) {
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('nextBtn').innerText = "End of Demo";
  }
});`;

const newNext = `document.getElementById('nextBtn').addEventListener('click', () => {
  step++;
  t = 0;
  const maxStep = (scenario === 1) ? 4 : 7;
  if(step >= maxStep) {
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('nextBtn').innerText = "End of Demo";
  }
  updateExplanation(scenario, step);
});`;

html = html.replace(oldNext, newNext);

// Initialize explanation on load
const oldInit = `function init() {
  resize();
  window.addEventListener('resize', resize);
  setScenario(1);
  requestAnimationFrame(loop);
}`;

const newInit = `function init() {
  resize();
  window.addEventListener('resize', resize);
  setScenario(1);
  updateExplanation(1, 0);
  requestAnimationFrame(loop);
}`;

html = html.replace(oldInit, newInit);

fs.writeFileSync('public/tier-waterfall.html', html);
