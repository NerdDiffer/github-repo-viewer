import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Message, Icon } from 'semantic-ui-react';
import * as actions from '../state/actions/current';

class FlashMessage extends Component {
  render() {
    const { isVisible } = this.props;

    if (!isVisible) {
      return null;
    } else {
      const { format, header, listItems, content } = this.props;

      return (
        <Message
          info={format === 'info'}
          error={format === 'error'}
          warning={format === 'warning'}
          success={format === 'success'}
          header={header}
          list={listItems}
          content={content}
        />
      );
    }
  }
};

const mapStateToProps = ({ current }) => {
  const { message } = current;

  return {
    ...message
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ ...actions }, dispatch)
);

const ConnectedFlashMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashMessage);

export default ConnectedFlashMessage;
