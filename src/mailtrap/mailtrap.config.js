import { MailtrapClient } from "mailtrap";

const TOKEN = "861335d893530817473e3cb45edfd08d";

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};
