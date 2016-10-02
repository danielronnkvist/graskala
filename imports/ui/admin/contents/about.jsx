import React, { Component, PropTypes } from 'react';
import PageForm from './pageForm.jsx';
import { About } from './../../../../lib/collections.js';

export default class AboutForm extends Component {

  saveData(data, id) {
    return new Promise((resolve, reject) => {
      About.update(id, {
        $set: data,
      }, {
        upsert: true,
      }, (err) => {err ? reject(err) : resolve()});
    });
  }

  render() {
    const {data} = this.props;

    return <PageForm data={data} saveImage={this.saveImage} saveData={this.saveData} />
  }

}

AboutForm.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  data: PropTypes.object.isRequired,
};
