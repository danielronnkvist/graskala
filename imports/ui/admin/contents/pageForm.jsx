import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ContentEditable from 'react-contenteditable';

function clean(obj) {
  return Object.keys(obj).reduce((o, k) => {
    if(obj[k]) o[k] = obj[k];
    return o;
  }, {});
}

export default class PageForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  getLoadingIcon() {
    if(this.state.loading) {
      return <div>loading...</div>
    }
  }

  uploadImage(data, id) {
    var self = this;
    var file = {
      type: data.image.files[0].type,
      name: data.image.files[0].name,
    }
    var reader = new FileReader();
    reader.addEventListener("load", function() {
      Meteor.call('upload', this.result, file, (err, result) => {
        data.image = result.url;
        self.props.saveData(data, id).then(() => {
          self.setState({
            loading: false,
          });
        })
      });
    });
    reader.readAsDataURL(this.image.files[0]);
  }

  handleSubmit(data) {
    this.setState({
      loading: true,
    });
    let saveObject = {
      title: this.title.lastHtml,
      text: this.text.lastHtml,
    };
    saveObject = clean(saveObject);

    if(this.image.files[0]) {
      saveObject.image = this.image
      this.uploadImage(saveObject, data._id);
    } else if(saveObject) {
      this.props.saveData(saveObject, data._id).then(() => {
        this.setState({
          loading: false,
        });
      });
    }
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
          { this.getLoadingIcon() }
        </div>
      </div>
    )
  }

}

PageForm.propTypes = {
  data: PropTypes.object.isRequired,
};
