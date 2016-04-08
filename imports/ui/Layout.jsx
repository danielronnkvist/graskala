import React, { Component, PropTypes } from 'react';

export default class Layout extends Component {

  render(main) {
    return (
      <div className="page-content">
        {this.props.main()}
      </div>
    );
  }

}
