const milestones = [50, 75, 95, 120];
const getWidth = (points) => {
  if (points <= milestones[0]) {
    return (points / milestones[0]) * 12.5;
  } else if (points <= milestones[1]) {
    return 12.5 + ((points - milestones[0]) / (milestones[1] - milestones[0])) * 25;
  } else if (points <= milestones[2]) {
    return 37.5 + ((points - milestones[1]) / (milestones[2] - milestones[1])) * 25;
  } else if (points <= milestones[3]) {
    return 62.5 + ((points - milestones[2]) / (milestones[3] - milestones[2])) * 25;
  } else {
    return Math.min(100, 87.5 + ((points - milestones[3]) / 30) * 12.5);
  }
};
console.log(getWidth(0)); // 0
console.log(getWidth(50)); // 12.5
console.log(getWidth(62.5)); // 25
console.log(getWidth(75)); // 37.5
console.log(getWidth(95)); // 62.5
console.log(getWidth(120)); // 87.5
console.log(getWidth(150)); // 100
