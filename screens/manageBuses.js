import React from 'react';
//import react in our code.

import { Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import Constants from 'expo-constants';

const MenuIcon = ({ navigate }) => <Icon
    name='three-bars'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;



export default class AddBus extends React.Component {

	static navigationOptions = function(props) {
  return {
		drawerLabel:'إدارة الحافلات',
    title: 'إدارة الحافلات',
    headerLeft: <View style={{paddingLeft:16}}>
				<Icon
						name="three-bars"
						size={25}
						color='white'
						onPress={() => props.navigation.openDrawer()} />
		</View>,

		headerTintColor: 'white',
		      headerStyle: {
		         backgroundColor: "#4C73CC"
		      }
	}
};

	render() {
    return (

       <SafeAreaView style={styles.scrollArea}>
      <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
      <View style={styles.smallContainer}>

     <TouchableHighlight style={[styles.buttonContainer, styles.addButton]} onPress={() => this.onClickListener('add')}>
          <Text style={styles.addText}>إضافة حافلة</Text>
        </TouchableHighlight>


        <Card style={{fontSize:96, backgroundcolor: '#3C68BF', }} title="حافلة #٩">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            • اسم السائق: فاروق
          </Text>

          <Text style={styles.paragraph}>
         • الحي: الغدير
          </Text>
          <Text style={styles.paragraph}>
           • رقم لوحة الحافلة: ٤٤٤ م ب س
          </Text>
        </Card>

            <Card title="حافلة #٣">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            • اسم السائق: محمد
          </Text>

          <Text style={styles.paragraph}>
         • الحي: الصحافة
          </Text>
           <Text style={styles.paragraph}>
           • رقم لوحة الحافلة: ٦٦٦ ب ي ت
          </Text>
        </Card>
        <Card title="معلومات الحافلة">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            • اسم السائق: محمود
          </Text>
          <Text style={styles.paragraph}>
            • رقم الحافلة: ٧
          </Text>

          <Text style={styles.paragraph}>
         • الحي: الربيع
          </Text>
          <Text style={styles.paragraph}>
           • رقم لوحة الحافلة: ٥٥٥ ح م د
          </Text>
        </Card>

      </View>
      </View>

      </ScrollView>
       </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
	container: {
	flex: 1,
	alignSelf: 'stretch',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#F7FAFF',
},
  smallContainer: {
    top: 50,
  },
  scrollArea: {
    flex: 1,

  },
  scrollView: {
    //backgroundColor: 'pink',
   // marginHorizontal: 20,
  },

  paragraph: {
    marginTop: 10,
    fontSize: 14,

    fontWeight: 'bold',
    textAlign: 'right',
    color: '#3C68BF',
    width:300 ,
    borderRadius: 550,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:12,
    width:250,
    borderRadius:30,
  },
  addButton: {
		flex: 1,
		alignSelf:'center',
      justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height:40,
    bottom: 5,
    backgroundColor:"#EDC51B",
    //marginBottom: 300,
  },
  addText: {
    color: 'white',
    fontSize: 18 ,
		fontWeight:'bold'
  }
});
