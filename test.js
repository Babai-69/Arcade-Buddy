const completedBadges = [{ title: "Spans and Plans" }, { title: "Arcade Simulator: Network Security Engineer" }, { title: "Level 1: Network Security Engineer" }];
const b = { name: "Arcade Simulator: Network Security Engineer" };

const isCompleted = completedBadges.some(cb => {
  const cbName = cb.title.toLowerCase().trim();
  const bName = b.name.toLowerCase().trim();
  return cbName === bName || bName.includes(cbName) || cbName.includes(bName);
});
console.log(isCompleted);
