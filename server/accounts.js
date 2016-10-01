import { Accounts } from 'meteor/accounts-base';

ServiceConfiguration.configurations.remove({
  service: 'google',
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_SECRET,
});

Accounts.validateNewUser(function(user) {
  let validEmails = process.env.VALID_EMAILS;
  if (validEmails.indexOf(user.services.google.email.toLowerCase()) > -1) {
    return true;
  } else {
    throw new Meteor.Error(403, "Email not allowed.");
  }
});
