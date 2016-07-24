import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';

import { About } from './../../../../lib/collections.js';

export default class AboutForm extends Component {

  handleSubmit(data) {
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
        <div className="text-container">
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
            <button
              className="save"
              onClick={this.handleSubmit.bind(this, data)}
            >
              Save!
            </button>
          </div>
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
