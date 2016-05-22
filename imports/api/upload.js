import { Meteor } from 'meteor/meteor';
import AWS from 'aws-sdk';

AWS.config.region = 'eu-west-1';
const S3 = new AWS.S3();

Meteor.methods({
  upload(file, filedata, cb) {
    var buf = new Buffer(file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filedata.name,
      ContentType: filedata.type,
      Body: buf,
      ContentEncoding: 'base64',
      ACL: 'public-read',
    };
    return new Promise((resolve, reject) => {
      S3.putObject(params, function(err, data) {
        if(err) reject(err);
        resolve({url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${filedata.name}`})
      });
    });

  }
});
