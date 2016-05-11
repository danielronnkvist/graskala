import { Accounts } from 'meteor/accounts-google';

ServiceConfiguration.configurations.remove({
  service: 'google',
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_SECRET,
});
