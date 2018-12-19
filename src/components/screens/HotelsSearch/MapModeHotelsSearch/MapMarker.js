import React, { Component } from 'react';
import red_marker from '../../../../assets/red_marker.png';

class MapMarker extends React.Component {

    constructor() {
        super();
        this.state = {
            initialized: false,
            active: false,
        };
    };    

    componentWillReceiveProps(nextProps) {
        if (!this.state.initialized) {
            console.log('initialization');            
            this.setState({initialized: true});
        }
        else {
            // If the nextProps.selected prop exists which it will
            if (nextProps.selected) {
                // If the nextProps.selected props id equals the this event id then selected else non-selected.
                if (nextProps.selected.id === nextProps.event.id) {
                    console.log('SELECTED: ' + JSON.stringify(nextProps.selected));
                    // set staae to active
                    this.setState({
                        active: true
                    });
                    console.log(interestIconsSelected[nextProps.event.interest[0]]);
                } else {
                    // set state to not active
                    // console.log('NON-SELECTED: ' + JSON.stringify(nextProps.event));   
                    this.setState({
                        active: false
                    });                
                }
                this.forceUpdate();
            }
        }
    }

    markerIcon(interest) {
        return this.state.active ? interestIconsSelected[interest] : interestIcons[interest];
    }

    onSelect(){
        console.log("seeleeeccttt");
    }
 
    renderIcon() {
        if (this.props.event.type === 'Event') {
            return (
                <Image
                    source={require('../../../../assets/red_marker.png')}
                />
            )
        }
    }
}