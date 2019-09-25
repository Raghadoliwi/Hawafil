import React from 'react';
//import react in our code.

import { Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight } from 'react-native';
//import all the components we are going to use.
import Constants from 'expo-constants';
import { Card } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';

export default class AddBus extends React.Component {
	render() {
    return (
       <SafeAreaView style={styles.scrollArea}>
      <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
      <View style={styles.smallContainer}>

     <TouchableHighlight style={[styles.buttonContainer, styles.addButton]} onPress={() => this.onClickListener('add')}>
          <Text style={styles.addText}>إضافة حافلة</Text>
        </TouchableHighlight>
<View
  style={{
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 2,
    width: 260,
     marginLeft: 50,
  }}
/>

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFF',

  },
  smallContainer: {
    top: 80,
  },
  scrollArea: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    //backgroundColor: 'pink',
   // marginHorizontal: 20,
  },

  paragraph: {
    marginTop: 20,
    fontSize: 18,

    fontWeight: 'bold',
    textAlign: 'center',
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
    //backgroundColor: "#FF4DFF",
    marginRight: 90,
      justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height:30,
    bottom: 5,
    backgroundColor:"#3C68BF",
    //marginBottom: 300,
  },
  addText: {
    color: 'white',
    fontSize: 16 ,
  }
});
