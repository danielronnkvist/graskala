import React, { Component, PropTypes } from 'react';

import Header from './../misc/Header.jsx';

export default class AdminLayout extends Component {

  render() {
    return (
      <div className="page-content">
        <Header />
        {this.props.main()}
      </div>
    );
  }

}
