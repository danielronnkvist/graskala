import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from './../../../lib/collections.js';

function getPage() {
  let page = FlowRouter.current().queryParams.page;
  if(!page) page = 1;
  return page;
}

class Pagination extends Component {

  getButtons(page, pages) {
    return Array.apply(null, Array(pages)).map((p, i) => {
      i += 1;
      return (
        <div key={i} onClick={ () => FlowRouter.setQueryParams({page:i}) }>
          {i}
        </div>
      );
    });
  }

  render() {
    let {
      numberOfPosts,
    } = this.props;
    let pages = Math.ceil(numberOfPosts / 5);
    let page = getPage();

    return (
      <div>
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
