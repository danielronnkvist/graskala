import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Posts, About, Contact } from './../lib/collections.js';
import './../imports/api/upload.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  getPost(slug) {
    if (slug) {
      return Posts.findOne({slug});
    }
  },
  deletePost(slug) {
    if (slug) {
      return Posts.remove({slug});
    }
  },
  getAboutData() {
    return About.findOne({}, { sort: { createdAt: -1 } });
  },
  getContactData() {
    return Contact.findOne({}, { sort: { createdAt: -1 } });
  },
});
