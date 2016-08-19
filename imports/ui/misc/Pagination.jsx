import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from './../../../lib/collections.js';

class Pagination extends Component {

  getButtons(page, pages) {
    return Array.apply(null, Array(pages)).map((p, i) => {
      i += 1;
      return (
        <div key={i}
             className={`page-button ${i == page ? 'active' : ''}`}
             onClick={ () => FlowRouter.setQueryParams({page:i}) }>
          {i}
        </div>
      );
    });
  }

  render() {
    let {
      numberOfPosts,
      page,
    } = this.props;
    let pages = Math.ceil(numberOfPosts / 5);

    return (
      <div className="pagination">
        {this.getButtons(page, pages)}
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    numberOfPosts: Posts.find({}).count(),
  };
}, Pagination);
