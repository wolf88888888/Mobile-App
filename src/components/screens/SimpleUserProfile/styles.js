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
    },

    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
        marginTop:15,
        marginBottom:15,
        marginLeft:20,
        marginRight:20,
    },

    topContainer: {
        width: '100%',
        height: 140,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },

    avatarContainer: {
        width: 80,
        height: 80,
        marginTop: 20,
    },

    avatarView: {
        width: 82,
        height: 82,
        borderRadius:41,
        borderWidth:1,
        borderColor: '#cccccc',
        justifyContent:'center',
        alignItems:'center'
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius:40,
    },

    name: {
        fontFamily: 'FuturaStd-Medium',
        fontSize:17,
        marginTop:10,
        color: '#000000',
    },

    location:{
        fontFamily: 'FuturaStd-Light',
        fontSize:13,
        marginTop:2,
        color:'#000000',
    },

    historyStyle: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
    },

    report: {
        fontFamily: 'FuturaStd-Light',
        fontSize:16,
        marginTop:15,
        marginLeft:20,
        marginRight:20,
        marginBottom:25,
        color: '#000000',
    }
});

export default styles;
