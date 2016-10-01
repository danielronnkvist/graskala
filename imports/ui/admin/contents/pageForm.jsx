import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';

export default class PageForm extends Component {

  uploadImage(image, id) {
    var file = {
      type: image.files[0].type,
      name: image.files[0].name,
    }
    var reader = new FileReader();
    var saveImage = this.props.saveImage;
    reader.addEventListener("load", function() {
      Meteor.call('upload', this.result, file, (err, data) => {
        data.id = id;
        saveImage(err, data);
      });
    });
    reader.readAsDataURL(this.image.files[0]);
  }

  handleSubmit(data) {
    if(this.image.files[0]) {
      this.uploadImage(this.image, data._id)
    }

    this.props.saveData({
      _id: data._id,
      title: this.title.lastHtml,
      text: this.text.lastHtml,
    });
  }

  render() {
    const {data} = this.props;

    return (
      <div className="container">
        <div className="page">
          <div className="profile">
            <img src={data.image} />
            <input
              type="file"
              ref={ node =>
                this.image = node
              }/>
          </div>
          <div className="text">
            <div>
              <ContentEditable
                html={data.title}
                tagName="h3"
                ref={ node =>
                  this.title = node
                }
              />
              <ContentEditable
                html={data.text}
                tagName="p"
                ref={ node =>
                  this.text = node
                }
              />
            </div>
          </div>
            <button
              className="save"
              onClick={this.handleSubmit.bind(this, data)}
            >
              Save!
            </button>
        </div>
      </div>
    )
  }

}

PageForm.propTypes = {
  data: PropTypes.object.isRequired,
};
