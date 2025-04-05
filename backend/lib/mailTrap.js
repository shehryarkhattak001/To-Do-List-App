const { MailtrapClient } = require("mailtrap");
require("dotenv").config();

const mailtrapClient = new MailtrapClient({
  token: "e38b8d9f0cb6965161a7e1d45feb10e6",
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

const sendWelcomeEmail = async (email, todo) => {
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject: `Todo "${todo.name}" is overdue`,
      text: `Your todo "${todo.name}`,
      html: "<h1>Welcome</h1>",
      category: "Welcome Email",
    });

    console.log("Welcome Email sent successfully!", response);
  } catch (error) {
    throw error.message;
  }
};

module.exports = { sendWelcomeEmail };
