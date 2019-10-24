import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

export default class approveStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', 'رقم الحافلة', 'الحي', 'الاسم'],
      tableData: [
        ['b1','btn2','btn3', '3', 'النفل', 'البتول'],
        ['b1','btn2', 'btn3','5', 'الغدير', 'الجوهرة'],
        ['b1', 'btn2','btn3','7', 'الواحة', 'رغد'],
        ['b1', 'btn2','btn3','9', 'الربيع', 'فهده'],
         ['b1', 'btn2','btn3','11', 'الصحافة', 'لمى']
      ]
    }
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}> التفاصيل</Text>
        </View>
      </TouchableOpacity>
    );
      const element2 = (data2, index2) => (
      <TouchableOpacity >
        <View style={styles.btn}>
          <Text style={styles.btnText}> رفض</Text>
        </View>
      </TouchableOpacity>
    );
      const element3 = (data3, index3) => (
      <TouchableOpacity >
        <View style={styles.btn}>
          <Text style={styles.btnText}> قبول</Text>
        </View>
      </TouchableOpacity>
    );


    return (
      <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.headText}/>
          {
            state.tableData.map((rowData, index,index2,index3) => (
              <TableWrapper key={[index,index2,index3]} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell
                    key={cellIndex} data={cellIndex === 0 ? element(cellData, index) : cellData} textStyle={styles.text}
                    key2={cellIndex} data2={cellIndex === 1 ? element2(cellData, index2) : cellData} textStyle={styles.text}
                    key3={cellIndex} data3={cellIndex === 2 ? element3(cellData, index3) : cellData} textStyle={styles.text}

                    />
                    ))
                }
              </TableWrapper>
            ))
          }


        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 150, backgroundColor: '#F7FAFF' },
  head: { height: 40, backgroundColor: '#7597DB', borderRadius: 10, bottom:10},
  headText:{color:'white', margin: 6, fontWeight:'bold', },
  text: { margin: 6 ,},
  row: { flexDirection: 'row',  backgroundColor: '#FFFAFA', borderRadius: 10 },
  btn: { width: 58, height: 19, backgroundColor: '#EDC51B',  borderRadius: 5 },
  btnText: { textAlign: 'center', color: '#fff', fontSize: 11,fontWeight:'bold' }
});
