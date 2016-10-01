import React, { Component, PropTypes } from 'react';
import PageForm from './pageForm.jsx';
import { About } from './../../../../lib/collections.js';

export default class AboutForm extends Component {

  saveImage(err, data) {
    About.update(data.id, {
      $set: {
        image: data.url,
      }
    }, {
      upsert: true,
    });
  }

  saveData(data) {
    About.update(data._id, {
      $set: {
        title: data.title,
        text: data.text,
      },
    }, {
      upsert: true,
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
