import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f1f3',
    },

    body: {
        flex:1,
        flexDirection:'column',
        marginLeft:20,
        marginRight:20,
    },

    footer:{
    },

    textareaContainer: {
        height: 200,
        padding: 5,
        marginTop: 30,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.3,
        borderColor: '#ccc',
    },

    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 190,
        fontSize: 15,
        fontFamily: 'FuturaStd-Light',
        color: '#000',
    },
});

export default styles;
