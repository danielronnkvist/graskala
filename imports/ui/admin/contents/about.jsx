import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';

import { About } from './../../../../lib/collections.js';

export default class AboutForm extends Component {

  uploadImage(image, id) {
    var file = {
      type: image.files[0].type,
      name: image.files[0].name,
    }
    var reader = new FileReader();
    reader.addEventListener("load", function() {
      Meteor.call('upload', this.result, file, function(err, data) {
        About.update(id, {
          $set: {
            image: data.url,
          }
        }, {
          upsert: true,
        })
      });
    });
    reader.readAsDataURL(this.image.files[0]);
  }

  handleSubmit(data) {
    if(this.image.files[0]) {
      this.uploadImage(this.image, data._id)
    }

    About.update(data._id, {
      $set: {
        title: this.title.lastHtml,
        text: this.text.lastHtml,
      },
    }, {
      upsert: true,
    });
  }

  render() {
    const {data} = this.props;

    return (
      <div className="container">
        <div className="about">
          <div className="profile">
            <img src={data.image} />
            <input
              type="file"
              ref={ node =>
                this.image = node
              }/>
          </div>
          <div className="text">
            <div>
              <ContentEditable
                html={data.title}
                tagName="h3"
                ref={ node =>
                  this.title = node
                }
              />
              <ContentEditable
                html={data.text}
                tagName="p"
                ref={ node =>
                  this.text = node
                }
              />
            </div>
          </div>
            <button
              className="save"
              onClick={this.handleSubmit.bind(this, data)}
            >
              Save!
            </button>
        </div>
      </div>
    )
  }

}

AboutForm.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  data: PropTypes.object.isRequired,
};
