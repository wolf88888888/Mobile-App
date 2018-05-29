import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';
import styles from './styles';

const reactNativePackage = require('react-native/package.json');
const splitVersion = reactNativePackage.version.split('.');
const majorVersion = +splitVersion[0];
const minorVersion = +splitVersion[1];

class Slideshow extends Component {
    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.shape({
    	    title: PropTypes.string,
    	    caption: PropTypes.string,
    	    url: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })).isRequired,
    	indicatorSize: PropTypes.number,
    	indicatorColor: PropTypes.string,
    	indicatorSelectedColor: PropTypes.string,
    	height: PropTypes.number,
    	position: PropTypes.number,
        scrollEnabled: PropTypes.bool,
        containerStyle: PropTypes.object,
        overlay: PropTypes.bool,
    	arrowSize: PropTypes.number,
        arrowLeft: PropTypes.object,
        arrowRight: PropTypes.object,
    	onPress: PropTypes.func,
    	onPositionChanged: PropTypes.func,
    }

    static defaultProps = {
        height: 200,
        indicatorSize: 8,
        indicatorColor: '#CCCCCC',
        indicatorSelectedColor: '#FFFFFF',
        scrollEnabled: true,
        arrowSize: 0,
    };

    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            height: Dimensions.get('window').width * (4 / 9),
            width: Dimensions.get('window').width,
            scrolling: false,
        };
    }

    _onRef(ref) {
        this._ref = ref;
        if (ref && this.state.position !== this._getPosition()) {
            this._move(this._getPosition());
        }
    }

    _move(index) {
        const isUpdating = index !== this._getPosition();
        const x = this.state.width * index;
        if (majorVersion === 0 && minorVersion <= 19) {
            this._ref.scrollTo(0, x, true); // use old syntax
        } else {
            this._ref.scrollTo({x: this.state.width * index, y: 0, animated: true});
        }
        this.setState({position: index});
        if (isUpdating && this.props.onPositionChanged) {
            this.props.onPositionChanged(index);
        }
    }

    _getPosition() {
        if (typeof this.props.position === 'number') {
            return this.props.position;
        }
        return this.state.position;
    }

    _next() {
        const pos = this.state.position === this.props.dataSource.length-1 ? 0 : this.state.position + 1;
        this._move(pos);
        this.setState({position: pos});
    }

    _prev() {
        const pos = this.state.position === 0 ? this.props.dataSource.length-1 : this.state.position - 1;
        this._move(pos);
        this.setState({position: pos});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            this._move(this.props.position);
        }
    }

    componentWillMount() {
        const width = this.state.width;

        let release = (e, gestureState) => {
            const width = this.state.width;
            const relativeDistance = gestureState.dx / width;
            const vx = gestureState.vx;
            let change = 0;

            if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
                change = 1;
            } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
                change = -1;
            }
            const position = this._getPosition();
            if (position === 0 && change === -1) {
                change = 0;
            }
            else if (position + change >= this.props.dataSource.length) {
                change = (this.props.dataSource.length) - (position + change);
            }
            this._move(position + change);
            return true;
        };

        this._panResponder = PanResponder.create({
            onPanResponderRelease: release
        });

        this._interval = setInterval(() => {
            const newWidth = Dimensions.get('window').width;
            if (newWidth !== this.state.width) {
                this.setState({width: newWidth});
            }
        }, 50);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        const width = this.state.width;
        const height = this.props.height || this.state.height;
        const position = this._getPosition();
        return (
            <View style={[this.props.containerStyle, { height: height }]}>
                {/* SECTION IMAGE */}
                <ScrollView
                    ref={ref => this._onRef(ref)}
                    decelerationRate={0.99}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={this.props.scrollEnabled}
                    {...this._panResponder.panHandlers}
                    style={[styles.container, { height: height }]}>
                    {this.props.dataSource.map((image, index) => {
                        const imageObject = typeof image.url === 'string' ? {uri: image.url} : image.url;
                        const textComponent = (
                            <View style={styles.layoutText}>
                                {image.title === undefined ? null : <Text style={styles.textTitle}>{image.title}</Text>}
                                {image.caption === undefined ? null : <Text style={styles.textCaption}>{image.caption}</Text>}
                            </View>
                        );
                        const imageComponent = (
                            <View key={index}>
                            <Image
                                source={imageObject}
                                style={{height, width}}/>
                                {textComponent}
                            </View>
                        );
                        const imageComponentWithOverlay = (
                            <View key={index} style={styles.containerImage}>
                                <View style={styles.overlay}>
                                    <Image
                                        source={imageObject}
                                        style={{height, width}}/>
                                </View>
                                {textComponent}
                            </View>
                        );
                        if (this.props.onPress) {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{height, width}}
                                    onPress={() => this.props.onPress({image, index})}
                                    delayPressIn={200}>
                                    {this.props.overlay ? imageComponentWithOverlay : imageComponent}
                                </TouchableOpacity>
                            );
                        } else {
                            return this.props.overlay ? imageComponentWithOverlay : imageComponent
                        }
                    })}
                </ScrollView>
                {/* END SECTION IMAGE */}
                {/* SECTION INDICATOR */}
                <View style={[styles.layoutIndicator,]}>
                    {this.props.dataSource.map((image, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => { return this._move(index); }}
                                style={[ [ styles.indicator, setIndicatorSize(this.props.indicatorSize), setIndicatorColor(this.props.indicatorColor) ],
                                    position === index && [ styles.indicatorSelected, setIndicatorColor(this.props.indicatorSelectedColor)]
                                ]}>
                                <View></View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                {/* END SECTION INDICATOR */}
                {/* SECTION ARROW LEFT */}
                <View style={[ layoutArrow(this.props.height, this.props.arrowSize), { left: 10 }, ]}>
                    <TouchableOpacity onPress={() => this._prev()}>
                    {
                        this.props.arrowRight == undefined ?
                        <View style={[ iconArrow(this.props.arrowSize), iconArrowLeft(this.props.arrowSize), ]}/> : this.props.arrowLeft
                    }
                    </TouchableOpacity>
                </View>
                {/* END SECTION ARROW LEFT */}
                {/* SECTION ARROW RIGHT */}
                <View style={[ layoutArrow(this.props.height, this.props.arrowSize), { right: 10 }, ]}>
                    <TouchableOpacity onPress={() => this._next()}>
                    {
                        this.props.arrowRight == undefined ?
                            <View style={[ iconArrow(this.props.arrowSize), iconArrowRight(this.props.arrowSize), ]}/>
                        :
                            this.props.arrowRight
                    }
                    </TouchableOpacity>
                </View>
                {/* END SECTION ARROW RIGHT */}
            </View>
        );
    }
}



const setIndicatorSize = function (size) {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
}

const setIndicatorColor = function (color) {
  return {
    backgroundColor: color,
  };
}

const layoutArrow = function (imageHeight, iconHeight) {
  return {
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    top: (imageHeight-iconHeight)/2,
    bottom: (imageHeight-iconHeight)/2,
  };
}

const iconArrow = function (iconHeight) {
  return {
     width: 0,
     height: 0,
     margin: 5,
     backgroundColor: 'transparent',
     borderStyle: 'solid',
     borderTopColor: 'transparent',
     borderBottomColor: 'transparent',
     borderTopWidth: iconHeight/2,
     borderBottomWidth: iconHeight/2,
  };
}

const iconArrowRight = function (iconHeight) {
  return {
     borderRightWidth: 0,
     borderLeftWidth: iconHeight*75/100,
     borderRightColor: 'transparent',
     borderLeftColor: 'white',
  };
}

const iconArrowLeft = function (iconHeight) {
  return {
     borderRightWidth: iconHeight*75/100,
     borderLeftWidth: 0,
     borderRightColor: 'white',
     borderLeftColor: 'transparent',
  };
}
export default Slideshow;