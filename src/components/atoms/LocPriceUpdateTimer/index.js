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
        let { seconds } = this.props;
        this.props.dispatch(setSeconds(seconds - 1));
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={styles.fab}>
                {
                    locRate != 0 ? 
                        (<Text style={styles.fabText}>LOC/{currency} {parseFloat(locRate).toFixed(2)}</Text>)
                        :
                        (<Text style={styles.fabText}>LOC/{currency}    </Text>)
                }
                    
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencySign: state.currency.currencySign,
        
        isLocPriceWebsocketConnected: state.exchangerSocket.isLocPriceWebsocketConnected,
        locAmounts: state.locAmounts,
        exchangeRates: state.exchangeRates,
    };
}


const mapDispatchToProps = dispatch => ({
    reset : bindActionCreators(reset , dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocPriceUpdateTimer);
