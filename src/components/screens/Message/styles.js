import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'stretch',
        backgroundColor: '#f0f1f3',
      },
      chatToolbar: {
      },
      requestView:{
        marginTop: 30,
        height: 180,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        marginBottom: 20,
      },
      requestTo:{
        fontFamily: 'futura',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 16,
        color: '#1f2427'
      },
      requestTitle:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        marginTop: 10,
        marginLeft: 16,
        color: '#1f2427'
      },
      requestDate:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        marginTop: 5,
        marginLeft: 16,
        color: '#1f2427'
      },
      requestButtonView:{
        marginTop: 0,
        marginLeft: 24,
        marginRight: 24,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      btn_requestapproveView:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#cc8068',
        borderRadius: 2,
        marginRight: 15,
      },
      btn_requestapprove:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        color: '#ffffff',
        paddingTop: 14,
        paddingBottom: 14,
      },
      btn_requestdeclineView:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#cccccc',
        marginLeft: 15,
      },
      btn_requestdecline:{
        fontFamily: 'FuturaStd-Light',
        fontSize: 16,
        color: '#1f2427',
        paddingTop: 14,
        paddingBottom: 14,
      },
      listBg: {
        backgroundColor: '#f0f1f3'
      },
      hiddenRow:{
        height: 0,
        width : 0,
      },
      rowStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 20,
      },
      imageStyle: {
        height: 40,
        width: 40,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 40 / 2
      },
      viewStyle: {
        // flex: 1,
        width: '80%',
        marginLeft: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 3,
        backgroundColor: 'white'
      },
      listChild: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        padding: 5,
        margin: 10,
        color: '#1f2427'
      },
      rowStyleSender: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 20,
      },
      imageStyleSender: {
        height: 40,
        width: 40,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 40 / 2
      },
      viewStyleSender: {
        flex: 1,
        width: '80%',
        marginLeft: 10,
        marginRight: 5,
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 15,
        backgroundColor: '#cc8068',
        borderColor: 'white'
      },
      listChildSender: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        padding: 5,
        margin: 10,
        color: 'white'
      },
      footerView: {
        height: 80,
        backgroundColor: '#f0f1f3',
        flexDirection: 'row',
        alignItems: 'center'
      },
      footerInputText: {
        marginLeft: 10,
        padding: 10,
        height: 50,
        borderWidth: 0.5,
        borderColor: '#cccccc',
        backgroundColor: '#FDD7E4',
        flex: 1,
        borderRadius: 100,
        backgroundColor: 'white',
        fontFamily: 'FuturaStd-Light',
        fontSize: 16
      },
      btn_camera: {},//To be used in future
      btn_gallery: {},//To be used in future
      btn_cameraImage: {
        height: 50,
        width: 50,
        marginRight: 10,
        marginLeft: 10,
      },
      btn_galleryImage: {
        height: 50,
        width: 50,
        marginRight: 10,
      },
      btn_backImage:{
        height: 25,
        width: 25,
        resizeMode: 'contain',
      },
      dateWrapper: {
        flexDirection: 'row',
        marginLeft: 16
      },
      dateText: {
        fontFamily: 'FuturaStd-Light',
        fontSize: 13,
        marginTop: 5,
        color: '#1f2427'
      },
      price: {
        fontSize: 13,
        marginTop: 5,
        color: '#1f2427',
        fontWeight: '300'
      }
});

export default styles;
