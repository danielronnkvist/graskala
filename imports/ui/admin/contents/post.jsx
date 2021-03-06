import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';

import { Posts } from './../../../../lib/collections.js';

export default class PostForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
    };
  }

  updatePostData(slug) {
    Meteor.call("getPost", slug, (err, post) => {
      this.setState({
        post: post,
      });
    });
  }

  uploadImage(image, post) {
    var self = this;
    var file = {
      type: image.files[0].type,
      name: image.files[0].name,
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
        },() => {
          self.updatePostData(post.slug);
        });
      });
    });
    reader.readAsDataURL(this.image.files[0]);
  }

  handleSubmit(post) {
    if(this.image.files[0]) {
      this.uploadImage(this.image, post)
    }

    Posts.update(post._id, {
      $set: {
        title: this.title.lastHtml ,
        slug: this.slug.value,
        text: this.text.lastHtml,
        createdAt: this.props.post.createdAt || new Date(),
      },
    }, {
      upsert: true,
    },() => {
      this.updatePostData(post.slug);
    });
  }

  removeImage(post) {
    Posts.update(post._id, {
      $unset: {
        image: "",
      },
    }, {
      upsert: true,
    },() => {
      this.updatePostData(post.slug);
    });
  }

  getDateString() {
    if(this.props.post.createdAt) {
      return this.props.post.createdAt.toDateString();
    }
  }

  render() {
    const {post} = this.state;

    return (
      <div className="post form">
        <div>
          <ContentEditable
            html={post.title}
            ref={ node =>
              this.title = node
            }
            tagName="h1"
            disabled={false}
          />
        </div>
        <small>{this.getDateString()}</small>
        <img src={post.image} />
        <input
          type="file"
          ref={ node =>
            this.image = node
          }/>
        <button onClick={() => this.removeImage(post)}>
          Ta bort bild
        </button>
        <br/>
        <input
          type="text"
          defaultValue={post.slug}
          ref={ node =>
            this.slug = node
          }
        />
        <ContentEditable
          html={post.text}
          tagName="p"
          ref={ node =>
            this.text = node
          }
          />
        <button
          className="save"
          onClick={this.handleSubmit.bind(this, post)}
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
