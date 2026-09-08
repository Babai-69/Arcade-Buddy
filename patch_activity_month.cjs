const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.tsx', 'utf8');

code = code.replace(
`function ActivityMonth({ badges }: { badges: any[] }) {
  // Simple heatmap generation for September
  const month = "September";
  // Determine days
  
  // Calculate badges per day
  const activityCount: Record<string, number> = {};
  if (badges) {
    badges.forEach(b => {
      const dStr = b._debugParsedDate || b.earnedDate.replace(/^Earned\\s+/i, '');
      if (dStr) {
        const d = new Date(dStr);
        if (!isNaN(d.getTime()) && d.getMonth() === 8) { // Sept is 8
          const dateKey = d.getDate();
          activityCount[dateKey] = (activityCount[dateKey] || 0) + 1;
        }
      }
    });
  }
  
  const activeDaysCount = Object.keys(activityCount).length;
  
  const daysInMonth = 30;
  const firstDay = 2; // Sept 1 2026 is Tuesday (0=Sun, 1=Mon, 2=Tue)
  
  const grid = [];
  for (let i = 0; i < 35; i++) {
    if (i < firstDay || i >= firstDay + daysInMonth) {
      grid.push(null);
    } else {
      const day = i - firstDay + 1;
      grid.push(activityCount[day] || 0);
    }
  }`,
`function ActivityMonth({ badges }: { badges: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[currentDate.getMonth()];

  const activityCount: Record<string, number> = {};
  if (badges) {
    badges.forEach(b => {
      const dStr = b._debugParsedDate || b.earnedDate.replace(/^Earned\\s+/i, '');
      if (dStr) {
        const d = new Date(dStr);
        if (!isNaN(d.getTime()) && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear()) {
          const dateKey = d.getDate();
          activityCount[dateKey] = (activityCount[dateKey] || 0) + 1;
        }
      }
    });
  }
  
  const activeDaysCount = Object.keys(activityCount).length;
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const grid = [];
  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
  for (let i = 0; i < totalCells; i++) {
    if (i < firstDay || i >= firstDay + daysInMonth) {
      grid.push(null);
    } else {
      const day = i - firstDay + 1;
      grid.push(activityCount[day] || 0);
    }
  }`
);

fs.writeFileSync('src/pages/DashboardPage.tsx', code);
