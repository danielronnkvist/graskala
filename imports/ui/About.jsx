import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { About } from './../../lib/collections.js';

class AboutComponent extends Component {

  getContent({title, text}) {
    return (
      <div>
        <h3 dangerouslySetInnerHTML={{__html: title}}></h3>
        <p dangerouslySetInnerHTML={{__html: text}}></p>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="page">
          <div className="profile">
            <img src={ this.props.data ? this.props.data.image : "" }/>
          </div>
          <div className="text">
            {this.props.data ? this.getContent(this.props.data) : ""}
          </div>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    data: About.findOne({}, { sort: { createdAt: -1 } }),
  };
}, AboutComponent);
