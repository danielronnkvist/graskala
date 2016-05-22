import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';

import { Posts } from '../../../api/posts.js';

export default class PostForm extends Component {

  handleSubmit() {
    var { post } = this.props;
    var file = {
      type: this.image.files[0].type,
      name: this.image.files[0].name,
    }
    var reader = new FileReader();
    reader.addEventListener("load", function() {
      Meteor.call('upload', this.result, file, function(err, data) {
        Posts.update(post._id, {
          $set: {
            image: data.url,
          }
        }, {
          upsert: true,
        })
      });
    });
    reader.readAsDataURL(this.image.files[0]);
    Posts.update(post._id, {
      $set: {
        title: this.title.lastHtml ,
        slug: this.slug.value,
        text: this.text.lastHtml,
        createdAt: post.createdAt || new Date(),
      },
    }, {
      upsert: true,
    });
  }

  getDateString() {
    if(this.props.post.createdAt) {
      return this.props.post.createdAt.toDateString();
    }
  }

  render() {
    return (
      <div className="post form">
        <div>
          <ContentEditable
            html={this.props.post.title}
            ref={ node =>
              this.title = node
            }
            tagName="h1"
            disabled={false}
          />
        </div>
        <small>{this.getDateString()}</small>
        <input
          type="file"
          id="image"
          ref={ node =>
            this.image = node
          }/>
        <br/>
        <input
          type="text"
          defaultValue={this.props.post.slug}
          ref={ node =>
            this.slug = node
          }
        />
        <ContentEditable
          html={this.props.post.text}
          tagName="p"
          ref={ node =>
            this.text = node
          }
          />
        <button
          className="save"
          onClick={this.handleSubmit.bind(this)}
        >
          Save!
        </button>
      </div>
    );
  }
}

PostForm.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  post: PropTypes.object.isRequired,
};
