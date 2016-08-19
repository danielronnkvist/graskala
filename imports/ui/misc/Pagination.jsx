import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from './../../../lib/collections.js';

class Pagination extends Component {

  getButtons(page, pages) {
    let nextButton = [(
      <div key={`last`}
           className={`page-button`}
           onClick={ () => FlowRouter.setQueryParams({page:page+1}) }>
        →
      </div>
    )];
    if(page === pages) nextButton = [];

    return Array.apply(null, Array(pages)).reduce((array, _, i) => {
      i += 1;

      if(pages < 6 || Math.abs(i - page) < 3 || i === 1 || i === pages) {
        array.push(
          <div key={i}
               className={`page-button ${i == page ? 'active' : ''}`}
               onClick={ () => FlowRouter.setQueryParams({page:i}) }>
            {i}
          </div>
        );
      } else if(Math.abs(i - page) === 3) {
        array.push(
          <div key={i}
               className={`page-button`}>
            ...
          </div>
        )
      }
      return array;
    }, []).concat(nextButton);
  }

  render() {
    let {
      numberOfPosts,
      page,
    } = this.props;
    page *= 1;
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
