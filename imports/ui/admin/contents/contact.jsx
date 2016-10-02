import React, { Component, PropTypes } from 'react';
import PageForm from './pageForm.jsx';
import { Contact } from './../../../../lib/collections.js';

export default class ContactForm extends Component {

  saveData(data, id) {
    return new Promise((resolve, reject) => {
      Contact.update(id, {
        $set: {
          title: data.title,
          text: data.text,
        },
      }, {
        upsert: true,
      }, (err) => {err ? reject(err) : resolve()});
    });
  }

  render() {
    const {data} = this.props;

    return <PageForm data={data} saveData={this.saveData} />
  }

}

ContactForm.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  data: PropTypes.object.isRequired,
};
