import {
    AsyncStorage,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

import ProgressDialog from '../../../atoms/SimpleDialogs/ProgressDialog';
import SmartInput from '../../../atoms/SmartInput';
import WhiteBackButton from '../../../atoms/WhiteBackButton';
import  { userInstance } from '../../../../utils/userInstance';
import requester from '../../../../initDependencies';

var arr = [];

class WalletKeywordValidation extends Component {

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        })
    }

    static defaultProps = {
        navigation: {
            navigate: () => {}
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            walletAddress: '',
            walletJson: '',
            walletMnemonic: '',
            keysArray: [null,null,null],
            keywordsArray: ['','',''],
            keyword1: '',
            keyword2: '',
            keyword3: '',
        }
    }

    async componentDidMount() {
        this.setState({ walletAddress: await AsyncStorage.getItem('walletAddress') });
        this.setState({ walletJson: await AsyncStorage.getItem('walletJson') });
        this.setState({ walletMnemonic: await AsyncStorage.getItem('walletMnemonic') });
        this.load()
        this.props.navigation.addListener('willFocus', this.load)
    }

    load = () => {
        arr = [];
        while(arr.length < 3){
            var randomnumber = Math.floor(Math.random()*12) + 1;
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        this.setState({keysArray: arr});
    }

    onChangeHandler(index) {
        return (value) => {
            //this.setState({ [property]: value });
            this.state.keywordsArray[index] = value;
            this.forceUpdate()
        };
    }

    suffix(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    correctAnswersCount = () => {
        var count = 0;
        for (var i = 0; i < this.state.keysArray.length; i++){
            if (this.state.keywordsArray[i].toLowerCase() === (this.state.walletMnemonic.split(' ')[this.state.keysArray[i]-1]).toLowerCase()) {
                //console.log(true);
                count += 1;
            }
        }
        return count;
    }


    onClickAccept = async () => {
        if (this.correctAnswersCount() === 3){
            const { params } = this.props.navigation.state;
            const {navigate} = this.props.navigation;
            let user = params;
            console.log("onClickAccept", user);
            
            this.setState({ showProgress: true });
            requester.getUserInfo()
            .then(res => res.body)
            .then(userInfo => {
                if (userInfo.birthday) {
                    let birthday = moment.utc(userInfo.birthday);
                    const day = birthday.add(1, 'days').format('D');
                    const month = birthday.format('MM');
                    const year = birthday.format('YYYY');
                    userInfo.birthday = `${day}/${month}/${year}`;
                }
        
                userInfo.countryState = userInfo.countryState && userInfo.countryState.id;
                userInfo.preferredCurrency = userInfo.preferredCurrency ? userInfo.preferredCurrency.id : 1;
                userInfo.country = userInfo.country && userInfo.country.id;
                userInfo.countryState = userInfo.countryState && parseInt(userInfo.countryState, 10);
                userInfo.locAddress = params.walletAddress;
                userInfo.jsonFile = params.walletJson;
        
                requester.updateUserInfo(userInfo, null).then(res => {
                    console.log("save wallet ----------", res);
                    this.setState({ showProgress: false });
                    if (res.success) {
                        userInstance.setLocAddress(params.walletAddress);
                        userInstance.setJsonFile(params.walletJson);
                        
                        navigate('CongratsWallet')
                    } else {
                    res.errors.then(e => {
                        this.setState({ showProgress: false });
                        Toast.showWithGravity('Cannot get messages, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
                        console.log(err);
                    });
                    }
        
                    this.closeModal(CONFIRM_WALLET);
                });
            });
            // user['image'] = PUBLIC_URL + "images/default.png";
            // user['jsonFile'] = this.state.walletJson;
            // user['locAddress'] = this.state.walletAddress;


            // const options = {
            //     title:"",
            //     message:"Registering...",
            //     isCancelable:false
            // };

            // this.setState({ showProgress: true });
            // requester.register(user, null).then(res => {
            //     console.log("register ----------", res);
            //         this.setState({ showProgress: false });
            //         if (res.success) {
            //             console.log("Error");
            //             console.log(res);
            //             navigate('CongratsWallet')
            //         } else {
            //             console.log("Error");
            //             res.errors.then(data => {
            //                 const { errors } = data;
            //                 Object.keys(errors).forEach((key) => {
            //                     if (typeof key !== 'function') {
            //                         Toast.showWithGravity(errors[key].message, Toast.SHORT, Toast.BOTTOM);
            //                         console.log('Error logging in:', errors[key].message);
            //                     }
            //                 });
            //             });
            //         }
            //     })
            //     .catch(err => {
            //         this.setState({ showProgress: false });
            //         Toast.showWithGravity('Cannot get messages, Please check network connection.', Toast.SHORT, Toast.BOTTOM);
            //         console.log(err);
            //     });
        }
        else {
            alert("Answers are not correct please retry")
        }
    };

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { walletMnemonic } = this.state;
        let i = 0;
        return (
            <ScrollView showsHorizontalScrollIndicator={false} style={{ width: '100%', backgroundColor: '#DA7B61' }}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <WhiteBackButton style={styles.closeButton} onPress={() => goBack()}/>

                        <View style={styles.main}>
                            <View style={styles.titleView}>
                                <Text style={styles.titleText}>Confirm Wallet Information</Text>
                            </View>

                            <View style={styles.infoView}>
                                <Text style={styles.infoText}>
                                    Enter Your mnemonic recovery keywords.
                                </Text>
                            </View>

                            <View style={styles.inputView}>
                                <SmartInput
                                    value={this.state.keywordWrittenByUser}
                                    onChangeText={this.onChangeHandler(0)}
                                    placeholder={`Enter ${this.suffix(this.state.keysArray[0])} mnemonic keyword`}
                                    placeholderTextColor="#fff"
                                />
                            </View>

                            <View style={styles.inputView}>
                                <SmartInput
                                    autoCorrect={false}
                                    value={this.state.keywordWrittenByUser}
                                    onChangeText={this.onChangeHandler(1)}
                                    placeholder={`Enter ${this.suffix(this.state.keysArray[1])} mnemonic keyword`}
                                    placeholderTextColor="#fff"
                                />
                            </View>

                            <View style={styles.inputView}>
                                <SmartInput
                                    autoCorrect={false}
                                    value={this.state.keywordWrittenByUser}
                                    onChangeText={this.onChangeHandler(2)}
                                    placeholder={`Enter ${this.suffix(this.state.keysArray[2])} mnemonic keyword`}
                                    placeholderTextColor="#fff"
                                />
                            </View>


                            {/*{walletMnemonic.split(' ').map(function (value) {*/}
                                {/*i++;*/}
                                {/*return (*/}
                                    {/*<View key={i} style={styles.inputView}>*/}
                                        {/*<SmartInput value={`${i}. ${value}`} placeholderTextColor="#fff" />*/}
                                    {/*</View>*/}
                                {/*)*/}
                            {/*})}*/}

                            {/*<View style={styles.nextButtonView}>*/}
                                {/*<TouchableOpacity*/}
                                    {/*onPress={() => this.test()}>*/}
                                    {/*<View style={styles.nextButton}>*/}
                                        {/*<Text style={styles.buttonText}>*/}
                                            {/*<FontAwesome>{Icons.arrowRight}</FontAwesome>*/}
                                        {/*</Text>*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}
                            {/*</View>*/}

                            <View style={styles.buttonsView}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{width: '50%',borderRadius: 25,
                                    borderColor: '#FFF',
                                    borderWidth: 1.5,
                                    backgroundColor: '#DA7B61', marginRight: 5, flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
                                    <Text style={styles.declineButtonText}>I didn't write down my keywords</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onClickAccept()} style={{width: '50%', borderRadius: 25,
                                    borderColor: '#FFF',
                                    borderWidth: 1.5,
                                    backgroundColor: '#FFF', marginLeft: 5, flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
                                    <Text style={styles.acceptButtonText}>Continue</Text>
                                </TouchableOpacity>
                                {/*<TouchableOpacity onPress={() => navigate('CreateWallet', { ...params })}>*/}
                                    {/*<View style={styles.acceptButtonView}>*/}
                                        {/*/!*<Text style={styles.acceptButtonText}>I didn't write down my keywords</Text>*!/*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}

                                {/*<TouchableOpacity onPress={this.onDecline}>*/}
                                    {/*<View style={styles.declineButtonView}>*/}
                                        {/*/!*<Text style={styles.declineButtonText}>Continue</Text>*!/*/}
                                    {/*</View>*/}
                                {/*</TouchableOpacity>*/}
                            </View>

                        </View>
                        <ProgressDialog
                            visible={this.state.showProgress}
                            title=""
                            message="Finalizing…"
                            animationType="slide"
                            activityIndicatorSize="large"
                            activityIndicatorColor="black"/>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

export default WalletKeywordValidation;
