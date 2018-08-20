import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f0f1f3'
    },

    navContainer: {
        height: 80,
        flexDirection: 'row',
        justifyContent:'space-between',

        // ios
       backgroundColor: '#f0f1f3',
       alignItems: 'center',
       shadowOffset: {width: 0, height: 1},
       shadowOpacity: 0.1,
       shadowRadius: 0.8,

       // android (Android +5.0)
       elevation: 0.5,
    },

    titleConatiner: {
        flexDirection: 'row',
    },

    closeButton: {
    },

    gender: {
        position:'absolute',
        top:0,
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#D87A61',
        textAlignVertical: "center",
        textAlign: 'center',
        color:'#fff',
        fontFamily: 'FuturaStd-Medium',
        fontSize:13
    },

    title: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 20,
        color: '#000',
        marginTop: 40,
        marginLeft: 20,
        height: 24,
    },

    closeButton: {
        zIndex: 1,
    },

    body: {
        flexDirection: 'column',
        paddingTop: 15,
    },

    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
        marginTop:15,
        marginBottom:15,
        marginLeft:20,
        marginRight:20,
    },

    historyStyle: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
    },

    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    sectionTitle: {
        fontFamily: 'FuturaStd-Medium',
        fontSize:17,
        marginTop:5,
        marginBottom:5,
        marginLeft:10,
        color: '#000000',
    },

    input: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 20,
        marginRight: 20,
    },

    sendButton: {
        height: 50,
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#DA7B61',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'FuturaStd-Light'
    },
});

export default styles;
