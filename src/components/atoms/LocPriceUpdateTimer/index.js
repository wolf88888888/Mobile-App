import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { reset } from '../../../redux/action/locPriceUpdateTimer'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class LocPriceUpdateTimer extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.tick = this.tick.bind(this);
        this.state = {
            seconds: null
        }
    }

    // componentDidMount() {
    //     this.timer = setInterval(this.tick, 1000);
    // }
    
    componentWillReceiveProps(nextProps) {
        console.log("LocPriceUpdateTimer - componentWillReceiveProps", nextProps);
        if (nextProps.seconds != null && nextProps.seconds > this.state.seconds) {
            clearInterval(this.timer);
            this.props.reset();
            this.setState({seconds: nextProps.seconds});
            this.timer = setInterval(this.tick, 1000);
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        this.props.reset();
    }

    tick() {
        this.setState((previousState) => {
            let seconds = previousState.seconds - 1;
            if (seconds < 0) seconds = 0;
            console.log("tick ------", seconds);
            return {seconds};
        });
    }

    render() {
        return (
                this.state.seconds != null?
                    <Text style={[this.props.style, styles.info]}>
                        LOC price will update in <Icon name={'clock-o'} color={'#fff'} size={16}/> {this.state.seconds}
                    </Text>
                :
                    null
        );
    }
}

let mapStateToProps = (state) => {
    return {
        seconds: state.locPriceUpdateTimer.seconds
    };
}


const mapDispatchToProps = dispatch => ({
    reset : bindActionCreators(reset , dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocPriceUpdateTimer);
