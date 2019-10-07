import React, {Component} from 'react';
//import react in our code.

import { Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import {CreateAppContainer } from 'react-navigation';
import {CreateStackNavigator } from 'react-navigation-stack';
import { CreateDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
import Firebase from 'firebase';
import Constants from 'expo-constants';
import DialogInput from 'react-native-dialog-input';


const MenuIcon = ({ navigate }) => <Icon
    name='three-bars'
    size={20}
    color='#fff'
    onPress={() => this.navigation.openDrawer()}
/>;



export default class ParentProfile extends React.Component {

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

      <View style={{padding: 10, flex: 1}, styles.container} >
      <ScrollView style={{flex: 1, marginBottom:20}}>

     <TouchableHighlight style={[styles.buttonContainer, styles.addButton]}
     onPress={() => this.props.navigation.push('addChild')}>
          <Text style={styles.addText}>إضافة تابع</Text>
        </TouchableHighlight>

         <Card containerStyle={styles.parentCard} title="معلومات ولي الأمر">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            • اسم ولي الأمر: عبدالله
          </Text>

          <Text style={styles.paragraph}>
            • البريد الإلكتروني:  abdullah123@gmail.com
          </Text>

          <Text style={styles.paragraph}>
           •  رقم الجوال:  ٥٠٥٦٠٤١٥٢ (٩٦٦+)
          </Text>
           <Text style={styles.paragraph}>
           • الحي : الغدير
          </Text>
             <Text style={styles.inline}>
           • عدد التابعين: ٤
          </Text>


           <TouchableHighlight style={[styles.buttonContainer, styles.editButton]}
     onPress={() => this.props.navigation.push('editParent')}>
          <Text style={styles.editText}>تعديل</Text>
        </TouchableHighlight>
        </Card>
   <Text style={styles.perInfo}>──────  التابعين ──────</Text>


<View style={styles.childrenContainer}>
        <Card containerStyle={styles.cards} title="معلومات الطالب ">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            • اسم الطالب: العنود
          </Text>

          <Text style={styles.paragraph}>
         • المدرسة: المناهج
          </Text>
           <Text style={styles.paragraph}>
           • المرحلة: ثانوي
          </Text>
          <Text style={styles.paragraph}>
           • رقم الحافلة: ٧
          </Text>
           <Text style={styles.inline}>
           • الحي : الغدير
          </Text>

           <TouchableHighlight style={[styles.buttonContainer, styles.editButton]}
     onPress={() => this.props.navigation.push('editChild')}>
          <Text style={styles.editText}>تعديل</Text>
        </TouchableHighlight>
        </Card>


<Card containerStyle={styles.cards} title="معلومات الطالب">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            • اسم الطالب: خالد
          </Text>

          <Text style={styles.paragraph}>
            • المدرسة: المناهج
          </Text>
          <Text style={styles.paragraph}>
         • المرحلة: متوسط
          </Text>
          <Text style={styles.paragraph}>
           • رقم الحافلة: ٧
          </Text>
           <Text style={styles.inline}>
           • الحي : الغدير
          </Text>

           <TouchableHighlight style={[styles.buttonContainer, styles.editButton]}
     onPress={() => this.props.navigation.push('editChild')}>
          <Text style={styles.editText}>تعديل</Text>
        </TouchableHighlight>
        </Card>

            <Card containerStyle={styles.cards} title="معلومات الطالب">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            • اسم الطالب: عبدالعزيز
          </Text>

          <Text style={styles.paragraph}>
            • المدرسة: المتقدمة
          </Text>
          <Text style={styles.paragraph}>
         • المرحلة: ثانوي
          </Text>
          <Text style={styles.paragraph}>
           • رقم الحافلة: ٩
          </Text>
           <Text style={styles.inline}>
           • الحي: الغدير
          </Text>

           <TouchableHighlight style={[styles.buttonContainer, styles.editButton]}
     onPress={() => this.props.navigation.push('editChild')}>
          <Text style={styles.editText}>تعديل</Text>
        </TouchableHighlight>
        </Card>
       <Card containerStyle={styles.cards} title="معلومات الطالب">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            • اسم الطالب: عمار
          </Text>

          <Text style={styles.paragraph}>
            • المدرسة: المناهج
          </Text>
          <Text style={styles.paragraph}>
         • المرحلة: ثانوي
          </Text>
          <Text style={styles.paragraph}>
           • رقم الحافلة: ٧
          </Text>
           <Text style={styles.inline}>
           • الحي : الغدير
          </Text>

           <TouchableHighlight style={[styles.buttonContainer, styles.editButton]}
     onPress={() => this.props.navigation.push('editChild')}>
          <Text style={styles.editText}>تعديل</Text>
        </TouchableHighlight>
        </Card>

</View>
      </ScrollView>
      </View>



    );
  }
}
const styles = StyleSheet.create({
	container: {
	justifyContent: 'center',
	alignItems: 'center',
  flex: 1,
	backgroundColor: '#F7FAFF',
},



  paragraph: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#3C68BF',
    borderRadius: 550,
  },
     perInfo:{
     color: "#9F9F9F",
      fontSize: 18 ,
      bottom: 20,
      marginTop: 60,
      left: 50,

       },
  inline:{
     fontSize: 14,
    fontWeight: 'bold',
    left: 20,
    color: '#3C68BF',
    top:-18
  },
  parentCard:{
      borderRadius: 25, width: 350, marginTop: 100, borderWidth: 0.5, shadowOpacity: 0.04,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },
  },
  cards:{
    borderRadius: 25, width: 250, left: 50 ,marginTop: 10, borderWidth: 0.5, shadowOpacity: 0.04,
            shadowRadius: 5,
            shadowColor: 'black',
            shadowOffset: { height: 0, width: 0 },
          backgroundColor: '#FFFAFA',

  },
  childrenContainer:{
    top:10,
  }

  ,
  buttonContainer: {
    height:45,
    top:25,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
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
    top: 90,
    backgroundColor:"#EDC51B",
    //marginBottom: 300,
  },
  addText: {
    color: 'white',
    fontSize: 18 ,
		fontWeight:'bold',
  },
  editButton:{

 	  flex: 1,
		alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height:30,
    bottom: 5,
    backgroundColor:"#3C68BF",
    //marginBottom: 300,
  },
  editText: {
    color: 'white',
    fontSize: 12,
		fontWeight:'bold'
  }
});
