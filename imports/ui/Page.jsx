import React, { Component } from 'react';

export default class Page extends Component {

  getContent(data) {
    if(data) {
      return (
        <div>
          <h3 dangerouslySetInnerHTML={{__html: data.title}}></h3>
          <p dangerouslySetInnerHTML={{__html: data.text}}></p>
        </div>
      );
    } else {
      return "";
    }
  }

  getImage(data) {
    if(data && data.image) {
      return <img src={ data.image }/>
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="container">
        <div className="page">
          <div className="profile">
            { this.getImage(this.props.data) }
          </div>
          <div className="text">
            { this.getContent(this.props.data) }
          </div>
        </div>
      </div>
    )
  }
}
