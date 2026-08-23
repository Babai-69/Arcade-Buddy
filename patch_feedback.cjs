const fs = require('fs');
let code = fs.readFileSync('src/pages/FeedbackPage.tsx', 'utf8');

const oldSubmit = `    try {
      // Also send email notification
      const response = await fetch('/api/feedback', {`;

const newSubmit = `    try {
      // Save feedback to Firestore
      await addDoc(collection(db, 'feedbacks'), {
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        review: formData.review,
        createdAt: serverTimestamp()
      });

      // Also send email notification
      const response = await fetch('/api/feedback', {`;

if (code.includes(oldSubmit)) {
  code = code.replace(oldSubmit, newSubmit);
  fs.writeFileSync('src/pages/FeedbackPage.tsx', code, 'utf8');
  console.log("Patched FeedbackPage.tsx");
} else {
  console.log("Could not find the target string in FeedbackPage.tsx");
}
