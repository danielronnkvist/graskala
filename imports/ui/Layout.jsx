import React, { Component, PropTypes } from 'react';

import Header from './misc/Header.jsx';

export default class Layout extends Component {

  render() {
    return (
      <div className="page-content">
        <Header />
        {this.props.main()}
      </div>
    );
  }

}
