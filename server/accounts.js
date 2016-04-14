import { Accounts } from 'meteor/accounts-google';

let settings = Meteor.settings.google ? Meteor.settings.google : {
  clientId: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_SECRET,
}

ServiceConfiguration.configurations.remove({
  service: 'google',
})
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: settings.clientId,
  secret: settings.secret,
});
