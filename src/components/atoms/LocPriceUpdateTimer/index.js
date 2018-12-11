import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './styles';

class LocPriceUpdateTimer extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.tick = this.tick.bind(this);
        this.state = {
            seconds: 0
        }
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.seconds > this.props.seconds) {
            clearInterval(this.timer);
            this.timer = setInterval(this.tick, 1000);
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        this.props.reset();
    }

    tick() {
        // let { seconds } = this.props;
        // this.props.dispatch(setSeconds(seconds - 1));
        let { seconds } = this.state
        this.setState({seconds: seconds - 1});
    }

    render() {
        return (
            <Text style={styles.fabText}>{}</Text>
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
