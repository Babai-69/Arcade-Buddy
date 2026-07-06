const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');
if (!content.includes('nodemailer')) {
    content = content.replace('import express from "express";', 'import express from "express";\nimport nodemailer from "nodemailer";');
}

const endpoint = `
  app.post("/api/notify-query", async (req, res) => {
    try {
      const { userEmail, userName, queryType, message } = req.body;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      
      if (!smtpUser || !smtpPass) {
        console.warn("SMTP credentials not configured. Skipping email notification.");
        return res.status(200).json({ success: true, warning: "Email skipped due to no config" });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: smtpUser,
        to: smtpUser, // Send to the admin
        replyTo: userEmail,
        subject: \`New Support Query: \${queryType} from \${userName}\`,
        text: \`You have received a new support query.\\n\\nFrom: \${userName} (\${userEmail})\\nType: \${queryType}\\nMessage:\\n\${message}\`
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });
`;
content = content.replace('  app.get("/api/milestones/spots",', endpoint + '\n  app.get("/api/milestones/spots",');
fs.writeFileSync('server.ts', content);
