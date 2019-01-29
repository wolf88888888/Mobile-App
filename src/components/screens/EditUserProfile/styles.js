import { StyleSheet, Dimensions } from 'react-native';
const dimensionWindows = Dimensions.get('window');

const avatarWidth = dimensionWindows.width;
const avatarHeight = avatarWidth * 30 / 55;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f0f1f3'
    },

    topContainer: {
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

    title: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 20,
        color: '#000',
        marginTop: 40,
        marginLeft: 20,
        height: 24,
        textAlignVertical: "center",
    },

    cameraContainer: {
        marginTop: 25,
        marginRight: 18
    },

    cameraButton: {
        width: 30,
        height: 30,
        resizeMode:"contain"
    },

    body: {
        flexDirection: 'column',
    },

    avatarWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },

    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },

    lineStyle:{
        borderWidth:0.3,
        borderColor:'#cccccc',
        marginTop:0,
        marginBottom:0,
        marginLeft:20,
        marginRight:20,
    },

    nameContainer: {
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },

    nameText: {
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'FuturaStd-Medium',
        fontSize:17,
        color:'#000'
    },

    aboutContainer: {
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },

    aboutText: {
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'FuturaStd-Light',
        fontSize:16,
        color:'#000'
    },

    editButton: {
        fontFamily: 'FuturaStd-Light',
        fontSize:15,
        marginTop:5,
        color:'#d97b61'
    },

    subtitleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    subtitleText: {
        fontFamily: 'FuturaStd-Medium',
        fontSize:16,
        color:'#000'
    },

    footer:{
     },
     
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
