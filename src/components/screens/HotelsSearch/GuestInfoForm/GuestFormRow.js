import { Picker, Text, TextInput, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import styles from './styles';

export default class GuestFormRow extends Component {
    constructor(props) {
        super(props);

        this.handleGuestInfo = this.handleGuestInfo.bind(this);

        this.state = {
            gender: [
                {
                    key: 0,
                    value: 'Mr'
                },
                {
                    key: 1,
                    value: 'Mrs'
                }
            ],
            guest: {
                genderRepresentation: 'Mr',
                firstName: 'aa',
                lastName: 'aa'
            },
            guestRecord: {}
        }
        // this.getUserName();

        console.log("GuestFormRow--------------");
    }

    // async getUserName() {
    //     if (this.props.itemIndex == 0) {
    //         let firstName = await userInstance.getFirstName();
    //         let lastName = await userInstance.getLastName();

    //         console.log("--------getUserNamegetUserName--", firstName, lastName);
    //         this.setState({
    //             guest: { ...this.state.guest, firstName: firstName == null ? '' : firstName, lastName: lastName == null ? '' : lastName },
    //         });
    //         this.props.onFirstNameChange(0, firstName == null ? '' : firstName);
    //         this.props.onLastNameChange(0, lastName == null ? '' : lastName);
    //     }
    //     else {
    //         this.props.onFirstNameChange(0, "Optional");
    //         this.props.onLastNameChange(0, "Optional");
    //     }
    // }

    handleGuestInfo() {
        this.setState(
            {
                guestRecord: {
                    "title": this.state.guest.genderRepresentation,
                    "firstName": this.state.guest.firstName,
                    "lastName": this.state.guest.lastName
                }
            }
        );
        this.props.onProceedClick(this.props.itemIndex, this.state.guestRecord)
    }
    componentDidMount() {
        this.setState({
            guest: this.props.guest
        });
    }

    onValueChange = value => {
        this.setState({ guest: { ...this.state.guest, genderRepresentation: value } })
    }

    textDone() {
        this.setState(
            {
                guestRecord: {
                    "title": this.state.guest.genderRepresentation,
                    "firstName": this.state.guest.firstName,
                    "lastName": this.state.guest.lastName
                }
            }
        );
        this.props.onTextDone(this.props.itemIndex, this.state.guestRecord);
    }

    render() {
        return (
            
            <View style={styles.guestInfoWrapper} key={this.props.guest.key}>

                {/* <ScrollView> */}
                    
                    <Text style={styles.labelGuest}>Guest</Text>
                <View style={styles.inputFieldsView}>
                    <View style={styles.genderFlex}>
                        <View style={[styles.gender, styles.spaceRight]}>

                            <Picker 
                                selectedValue={this.state.guest.genderRepresentation}
                                style={{ height: '100%', width: '100%'}}
                                itemStyle={{backgroundColor: '#fff', height: '100%', fontFamily: 'FuturaStd-Light', fontSize:17}}
                                onValueChange={this.onValueChange}>
                                <Picker.Item label="Mr" value="Mr" />
                                <Picker.Item label="Mrs" value="Mrs" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.firstNameFlex}>
                        <TextInput
                            style={[styles.formField, styles.spaceRight]}
                            onChangeText={(text) => { this.props.onFirstNameChange(this.props.itemIndex, text), this.setState({ guest: { ...this.state.guest, firstName: text } }) }}
                            placeholder={this.props.itemIndex == 0 ? "First Name" : "Optional"}
                            underlineColorAndroid="#fff"
                            value={this.state.guest.firstName}
                        />
                    </View>
                    <View style={styles.lastNameFlex}>
                        <TextInput
                            style={styles.formField}
                            onChangeText={(text) => { this.props.onLastNameChange(this.props.itemIndex, text), this.setState({ guest: { ...this.state.guest, lastName: text } }) }}
                            placeholder={this.props.itemIndex == 0 ? "Last Name" : "Optional"}
                            underlineColorAndroid="#fff"
                            value={this.state.guest.lastName}
                        />
                    </View>
                </View>
                    {/* </KeyboardAvoidingView> */}
                {/* </ScrollView> */}
            
               
                
            </View>
        )
    }
}
GuestFormRow.propTypes = {
    onFirstNameChange: PropTypes.func.isRequired,
    onLastNameChange: PropTypes.func.isRequired,
};