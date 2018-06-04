import React, {Component} from 'react';
import {View, Text, TextInput,Picker,Item} from 'react-native';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

export default class GuestFormRow extends Component {
    constructor(props) {
        super(props);
        
        this.handleGuestInfo = this.handleGuestInfo.bind(this);
        
        this.state = {
            gender:[
                {
                    key : 0,
                    value:'Mr'
                },
                {
                    key : 1,
                    value:'Mrs'
                }
            ],
            guest: {
                genderRepresentation: 'Mr',
                firstName: '',
                lastName: ''
            },
            guestRecord : {}
        }
    }

    handleGuestInfo(){
        // console.log(firstName)
        this.setState(
            {
                guestRecord :{
                    "title": this.state.guest.genderRepresentation,
                    "firstName": this.state.guest.firstName,
                    "lastName": this.state.guest.lastName
                }
            }
        );
        this.props.onProceedClick(this.props.itemIndex,this.state.guestRecord)
    }
    componentDidMount() {
        this.setState({
            guest: this.props.guest
        });
    }

    onValueChange = value => {     
        this.setState({
            gender:value,
            genderRepresentation: value
        });
      }

    render() {
        return (
            <View style={styles.guestInfoWrapper} key={this.props.guest.key}>
                <Text style={styles.labelGuest}>Guest</Text>
                <View style={styles.inputFieldsView}>
                    <View style={styles.genderFlex}>
                        <View style={[styles.gender, styles.spaceRight]}>
                        
                            <Picker selectedValue={this.state.gender} 
                            style={{height: '100%', width: '100%',}}
                            itemStyle={{height:'100%',fontFamily: 'FuturaStd-Light',}}
                            onValueChange={this.onValueChange}>
  
                            <Item label="Mr" value="Mr" />
                            <Item label="Mrs" value="Mrs" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.firstNameFlex}>
                        <TextInput
                            style={[styles.formField, styles.spaceRight]}
                            onChangeText={(firstName) => {
                                let guest = Object.assign([], this.state.guest);
                                guest.firstName = firstName;
                                this.setState({guest})
                                this.handleGuestInfo();
                            }}
                            value={this.state.guest.firstName}
                            placeholder="First Name"
                        />
                    </View>
                    <View style={styles.lastNameFlex}>
                        <TextInput
                            style={styles.formField}
                            onChangeText={(lastName) => {
                                let guest = Object.assign([], this.state.guest);
                                guest.lastName = lastName;
                                this.setState({guest})
                                this.handleGuestInfo();
                            }}
                            value={this.state.guest.lastName}
                            placeholder="Last Name"
                        />
                    </View>
                </View>
            </View>
        )
    }
}
GuestFormRow.propTypes = {
    gotoSearch: PropTypes.func.isRequired,
};