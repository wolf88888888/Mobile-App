import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import styles from './styles';

class ReadMoreView extends React.Component {
  state = {
    measured: false,
    shouldShowReadMore: false,
    showAllText: false,
  }

  async componentDidMount() {
    await nextFrameAsync();

    // Get the height of the text with no restriction on number of lines
    const fullHeight = await measureHeightAsync(this._text);
    this.setState({measured: true});
    await nextFrameAsync();

    // Get the height of the text now that number of lines has been set
    const limitedHeight = await measureHeightAsync(this._text);

    if (fullHeight > limitedHeight) {
      this.setState({shouldShowReadMore: true}, () => {
        this.props.onReady && this.props.onReady();
      });
    }
  }

  render() {
    let {
      measured,
      showAllText,
    } = this.state;

    let {
      numberOfLines,
    } = this.props;

    return (
      <View style={[this.props.style]}>
        <Text
          numberOfLines={measured && !showAllText ? numberOfLines : 0}
          ref={text => { this._text = text; }}>
          {this.props.children}
        </Text>

        {this.state.shouldShowReadMore && this._maybeRenderReadMore()}
      </View>
    );
  }

  _handlePressReadMore = () => {
    this.setState({showAllText: true});
  }

  _handlePressReadLess = () => {
    this.setState({showAllText: false});
  }

  _maybeRenderReadMore() {
    let {
      shouldShowReadMore,
      showAllText,
    } = this.state;

    if (shouldShowReadMore && !showAllText) {
      if (this.props.renderTruncatedFooter) {
        return this.props.renderTruncatedFooter(this._handlePressReadMore);
      }

      return (
        <Text style={[styles.button, this.props.buttonStyle]} onPress={this._handlePressReadMore}>
          read more
        </Text>
      )
    } else if (shouldShowReadMore && showAllText) {
      if (this.props.renderRevealedFooter) {
        return this.props.renderRevealedFooter(this._handlePressReadLess);
      }

      return (
        <Text style={[styles.button, this.props.buttonStyle]} onPress={this._handlePressReadLess}>
          hide
        </Text>
      );
    }
  }
}

function measureHeightAsync(component) {
  return new Promise(resolve => {
    component.measure((x, y, w, h) => {
      resolve(h);
    });
  });
}

function nextFrameAsync() {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

export default ReadMoreView;
