import { Accounts } from 'meteor/accounts-google';

ServiceConfiguration.configurations.remove({
  service: 'google',
})
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: Meteor.settings.google.clientId || process.env.GOOGLE_CLIENT_ID,
  secret: Meteor.settings.google.secret || process.env.GOOGLE_SECRET,
});
