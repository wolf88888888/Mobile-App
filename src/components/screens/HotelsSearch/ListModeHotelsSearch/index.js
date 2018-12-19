import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import _ from 'lodash';

import styles from './styles';

import { UltimateListView } from '../../../../../library/UltimateListView';
import { DotIndicator } from 'react-native-indicators';
import HotelItemView from '../../../organisms/HotelItemView';

const { width, height } = Dimensions.get('window');

class ListModeHotelsSearch extends Component {

    isRefresh = false;

    constructor(props) {
        super(props);

        this.state = {
            allElements: this.props.allElements,
            currency: this.props.currency, 
            currencySign: props.currencySign,
            locRate: props.locRate,
            daysDifference: props.daysDifference,
        };
    }

	// shouldComponentUpdate(nextProps) {
    //     if (this.isRefresh) {
    //         this.isRefresh = false;
    //         return true;
    //     }
	// 	return false;
	// }

    componentDidUpdate(prevProps) {
        // if (this.props.currency != prevProps.currency || this.props.locRate != prevProps.locRate) {
        let newState  = {};
        let isChanged = false;

        if (this.props.currency != prevProps.currency) {
            newState = {...newState, currency: this.props.currency, currencySign: this.props.currencySign};
            isChanged = true;
        }

        if (this.props.locRate != prevProps.locRate) {
            newState = {...newState, locRate: this.props.locRate};
            isChanged = true;
        }

        if (this.props.daysDifference != prevProps.daysDifference) {
            newState = {...newState, daysDifference: this.props.daysDifference};
            isChanged = true;
        }

        if (this.props.allElements != prevProps.allElements) {
            newState = {...newState, allElements: this.props.allElements};
            isChanged = true;
        }

        if (isChanged) {
            // this.isRefresh = true;
            this.setState(newState);
            console.log("this.isRefresh", newState);
        }
        // }
    }

    initListView = () => {
        return this.listView.initListView();
    }

    onFirstLoad = (rows, isLoadPrice) => {
        return this.listView.onFirstLoad(rows, isLoadPrice);
    }

    onDoneSocket = () => {
        return this.listView.onDoneSocket();
    }

    upgradePrice = (index, price) => {
        return this.listView.upgradePrice(index, price);
    }

    getIndex = (id) => {
        return this.listView.getIndex(id);
    }

    
    getPage = () => {
        return this.listView.getPage();
    }

    getRows = () => {
        return this.listView.getRows();
    }

    // onFetch = (page = 1, startFetch, abortFetch) => {
    //     console.log("onFetch", page);
    //     this.props.onFetch(page, startFetch, abortFetch);
    // }

    renderItem = (item) => {
        return (
            <HotelItemView
                item = {item}
                gotoHotelDetailsPage = {this.props.gotoHotelDetailsPage}
                daysDifference = {this.state.daysDifference}
                isDoneSocket = {this.state.allElements}
            />
        )
    }

    renderPaginationFetchingView = () => (
        <View style={{width, height:height - 160, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width:50, height:50}} source={require('../../../../assets/loader.gif')}/>
        </View>
    )
    
    renderPaginationWaitingView = () => {
        return (
            <View style={
                {
                    flex: 0,
                    width,
                    height: 55,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }>
                <DotIndicator color='#d97b61' count={3} size={9} animationDuration={777}/>
            </View>
        )
    }

    renderPaginationAllLoadedView = () => {
        return (<View/>)
    }

    render() {
        return (
            <View style={styles.container}>
                <UltimateListView
                    ref = {ref => this.listView = ref}
                    isDoneSocket = {this.state.allElements}
                    key = {'list'} // this is important to distinguish different FlatList, default is numColumns
                    onFetch = {this.props.onFetch}
                    keyExtractor = {(item, index) => `${index} - ${item}`} // this is required when you are using FlatList
                    firstLoader = { false }
                    refreshable = { false }
                    item = {this.renderItem} // this takes three params (item, index, separator)
                    numColumns = {1} // to use grid layout, simply set gridColumn > 1
                    paginationFetchingView = {this.renderPaginationFetchingView}
                    paginationWaitingView = {this.renderPaginationWaitingView}
                    paginationAllLoadedView = {this.renderPaginationAllLoadedView}
                />
            </View>
        );
    }
}

export default ListModeHotelsSearch;
