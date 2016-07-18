import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Posts } from './../lib/collections.js';
import './../imports/api/upload.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  getPost: function (slug) {
    if (slug) {
      return Posts.findOne({slug});
    }
  }
});
