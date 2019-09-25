import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert} from 'react-native';

export default class registration extends React.Component {

    render() {
        return (
                <View style={styles.container}>

                <View style={styles.smallContainer}>

                <Text style={styles.Main}> التسجيل كـ</Text>



                <TouchableHighlight style={[styles.firstButtonContainer, styles.typeButton]} onPress={this.handleLogin}>

                <Text style={styles.firstText}>منشأة تعليمية</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.secondButtonContainer, styles.typeButton]} onPress={this.handleLogin}>

                <Text style={styles.secondText}>ولي أمر طالب</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.thirdButtonContainer, styles.typeButton]} onPress={this.handleLogin}>

                <Text style={styles.thirdText}>طالب</Text>
                </TouchableHighlight>


                </View>
                </View>
                );
    }
}

const styles = StyleSheet.create({
                                 Main:{
                                 color:'#EDC51B',
                                 flexDirection: 'row',
                                 marginLeft:140,
                                 marginBottom:20,
                                 marginTop:10,
                                fontSize:25,
                                 },

                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: '#F7FAFF',
                                 flexDirection: 'row',
                                 },
                                 smallContainer:{
                                 marginTop:400,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 backgroundColor: 'white',
                                 borderRadius:10,
                                 width:300,
                                 height:300,
                                 },


                                 firstButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'80%',
                                 borderRadius:45,
                                 borderColor:'#5681D5',
                                 borderWidth:1,
                                 },
                                secondButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'80%',
                                 borderRadius:45,
                                 borderColor:'#8BC8E4',
                                 borderWidth:1,
                                 },
                                thirdButtonContainer: {
                                 height:40,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginBottom:10,
                                 width:'80%',
                                 borderRadius:45,
                                 borderColor:'#BBC3D4',
                                 borderWidth:1,
                                 },


                                typeButton: {
                                 backgroundColor: "#ffffff",
                                    margin:7,

                                },

                                firstText: {
                                 color: '#5681D5',
                                    fontSize:15,
                                 },
                                secondText: {
                                 color: '#8BC8E4',
                                    fontSize:15,
                                 },
                                thirdText: {
                                 color: '#BBC3D4',
                                    fontSize:15,
                                 },

                                 });
