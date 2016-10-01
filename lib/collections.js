import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');
export const About = new Mongo.Collection('about');
export const Contact = new Mongo.Collection('contact');
