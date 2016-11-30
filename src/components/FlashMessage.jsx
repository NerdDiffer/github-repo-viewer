import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';

const isMessagePresent = ({ content }) => !!content;

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = { isVisible: isMessagePresent(this.props) };

    this.hideMessage = this.hideMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const willHaveMessage = isMessagePresent(nextProps);

    if (willHaveMessage) {
      this.setState({ isVisible: true });
    }
  }

  hideMessage() {
    this.setState({ isVisible: false });
  }

  render() {
    const { isVisible } = this.state;

    if (!isVisible) {
      return null;
    } else {
      const { format, header, listItems, content } = this.props;

      return (
        <Message
          onDismiss={this.hideMessage}
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

const mapStateToProps = ({ message }) => ({ ...message })

const ConnectedFlashMessage = connect(
  mapStateToProps
)(FlashMessage);

export default ConnectedFlashMessage;
