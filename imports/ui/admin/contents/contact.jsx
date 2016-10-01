import React, { Component, PropTypes } from 'react';
import PageForm from './pageForm.jsx';
import { Contact } from './../../../../lib/collections.js';

export default class ContactForm extends Component {

  saveImage(err, data) {
    Contact.update(data.id, {
      $set: {
        image: data.url,
      }
    }, {
      upsert: true,
    });
  }

  saveData(data) {
    Contact.update(data._id, {
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

ContactForm.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  data: PropTypes.object.isRequired,
};
