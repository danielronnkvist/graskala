import React, { Component, PropTypes } from 'react';
import PageForm from './pageForm.jsx';

export default class FormContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  saveData(data, id) {
    return new Promise((resolve, reject) => {
      this.props.collection.update(id, {
        $set: {
          title: data.title,
          text: data.text,
        },
      }, {
        upsert: true,
      }, (err, data) => {
        err ? reject(err) : resolve();
        Meteor.call("getContactData", (err, data) => {
          this.setState({
            data: data,
          });
        });
      });
    });
  }

  render() {
    const {data} = this.state;

    return <PageForm data={data} saveData={this.saveData.bind(this)} />
  }

}

FormContainer.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  data: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
};
