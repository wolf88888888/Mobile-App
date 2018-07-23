import React, {Component} from 'react';
import {
  View,
  Modal,
  StatusBar
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Header from './viewer-header';
import Carousel from './carousel';
import TouchableImage from './touchable-image';

type Props = {
  indicatorAtBottom: boolean,
  indicatorOffset: number,
  images: {uri: string}[],
  renderHeader: ({[key: string]: any}, number) => void,
  renderFooter: ({[key: string]: any}, number) => void,
}

export default class ImageCarousel extends Component {
  props: Props
  state: {
    showModal: boolean,
    imageIndex: number,
    fromCarousel: boolean,
  }
  scrolling: boolean

  static defaultProps = {
    renderHeader: () => {},
    renderFooter: () => {},
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      showModal: false,
      imageIndex: 0,
      fromCarousel: false,
    };

    (this: any)._onPressImg = this._onPressImg.bind(this);
    (this: any)._updateIndex = this._updateIndex.bind(this);
    (this: any)._closeModal = this._closeModal.bind(this);
    (this: any)._setPageChange = this._setPageChange.bind(this);
  }

  _onPressImg(i) {
    this.setState({
      showModal: true,
      imageIndex: i,
    });
  }

  _updateIndex(i, fromCarousel) {
    this.setState({
      imageIndex: i,
      fromCarousel,
    });
  }

  _closeModal() {
    this.setState({
      showModal: false,
    });
  }

    _onScroll() {
        this.scrolling = true;
    }

    _setScrollFalse() {
        this.scrolling = false;
    }

    _setPageChange(activeIndex) {
      this._setScrollFalse();
      this._updateIndex(activeIndex, true);
    }

  render() {
    const {images, renderHeader, renderFooter,
      indicatorAtBottom, indicatorOffset, ...rest} = this.props;
    const {showModal, imageIndex, fromCarousel} = this.state;
    let extraPadding = {};

    if ((typeof indicatorAtBottom === 'undefined' || indicatorAtBottom)
      && indicatorOffset < 0) {
      extraPadding = {paddingBottom: -indicatorOffset};
    } else if (!indicatorAtBottom && indicatorOffset < 0) {
      extraPadding = {paddingTop: -indicatorOffset};
    }

    return (
      <View style={{flex:1}}>
        {showModal && (<StatusBar
            backgroundColor="#000"
            barStyle="light-content"
        />)}
        <Modal
          onRequestClose={this._closeModal}
          visible={showModal}
          transparent={true}>
          <ImageViewer
            renderHeader={() => <Header onClose={() => this._closeModal()}/>}
            onChange={this._updateIndex}
            saveToLocalByLongPress={false}
            imageUrls={images.map((img) => {
              let modifyImg = img;
              if (img.uri) {
                modifyImg = Object.assign({}, img, {url: img.uri});
              }
              return modifyImg;
            })}
            index={imageIndex}/>
        </Modal>
        {renderHeader(images[imageIndex], imageIndex)}
        <View style={[extraPadding, {flex:1}]}>
            <Carousel
              {...rest}
              contentContainer={{flex:1}}
              indicatorOffset={indicatorOffset}
              indicatorAtBottom={indicatorAtBottom}
              initialPage={imageIndex}
              fromCarousel={fromCarousel}
              onPageChange={this._setPageChange}
              onScroll={this._onScroll}
              onScrollBegin={this._setScrollFalse}
              >
              {
                /* this.scrolling prevent trigger onPress while is scrolling */
                images.map((img, i) => {
                  return (
                    <View>
                      <TouchableImage
                          style={{width:this.props.width, height:this.props.height}}
                        key={i}
                        image={img}
                        onPress={this.scrolling ? () => {} : () => this._onPressImg(i)}
                        />
                    </View>
                  );
                })
              }
            </Carousel>
        </View>
        {renderFooter(images[imageIndex], imageIndex)}
      </View>
    );
  }
}
