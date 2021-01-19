/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,TouchableOpacity,FlatList,Modal,TouchableHighlight, TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { Table, Row, Rows } from 'react-native-table-component';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';

export default class App extends Component {
  constructor(props) {
    super(props);
    const elementButton = (value) => (
      <TouchableOpacity onPress={() => this.setState({modal2Visible:true})}>
        <View style={styles.modaltable}>
          <Text style={{fontWeight:'bold'}}>{value}</Text>
        </View>
      </TouchableOpacity>
    );
    this.state = {
      isVisible: false,
      modalVisible:false,
      tableHead: ['Mã', 'Tên chương trình', 'Trạng thái', ''],
      tableData: [
        [elementButton('KM111020'), 'Hóa đơn - giảm giá HD', 'Kích hoạt', 'chi tiết >>'],
        [elementButton('KM201120'), 'Nhà giáo việt nam', 'Tạm ngưng', 'chi tiết >>'],
        [elementButton('KM230820'), 'Tưng bừng tựu trường', 'Hoàn thành', 'chi tiết >>']
      ],
      table1Head: ['Tổng tiền', 'Giảm giá', ''],
      table1Data: [
        ['100.000', '10%', 'X'],
      ],
      table2Head: ['Mã phiếu', 'Thời gian', 'Người nhận đặt','Tổng tiền','Giảm giá khuyến mãi'],
      table2Data: [
        ['', '', '','800.000','720.000'],
        ['DH00001', '20/11/2020 14:51', 'Admin','500.000','450.000'],
        ['DH00002', '20/11/2020 17:21', 'Admin','300.000','270.000'],
      ],
      table3Data: [
        ['', '', '','1.000.000','900.000'],
        ['HD00001', '20/11/2020 14:51', 'Admin','500.000','450.000'],
        ['HD00002', '20/11/2020 17:21', 'Admin','500.000','450.000'],
      ],
      radio_props: [
        {label: 'Chưa kích hoạt', value: 0 },
        {label: 'Đang hoạt động', value: 1 },
        {label: 'Tất cả', value: 2 }
      ],
      radio_2_props: [
        {label: 'Kích hoạt', value: 0 },
        {label: 'Chưa kích hoạt', value: 1 },
      ],
      valuePicker:'9',
      selectedID:'',
      modal2Visible:false,
      table1Visible:false,
      table2Visible:false,
      table3Visible:false,
      table4Visible:false,
    };
  }

  toggleList = event => {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  toggleModal(visible){
    this.setState({
      modalVisible: visible
    })
  }

  toggleModal2(visible){
    this.setState({
      modal2Visible: visible
    })
  }
  toggleTable(id){
    this.setState({selectedID:id});
    if (id==1){
      this.setState({
        table1Visible:true,
        table2Visible:false,
        table3Visible:false,
        table4Visible:false
      })
    }
    else if (id==2){
      this.setState({
        table1Visible:false,
        table2Visible:true,
        table3Visible:false,
        table4Visible:false
      })
    }
    else if (id==3){
      this.setState({
        table1Visible:false,
        table2Visible:false,
        table3Visible:true,
        table4Visible:false
      })
    }
    else if (id==4){
      this.setState({
        table1Visible:false,
        table2Visible:false,
        table3Visible:false,
        table4Visible:true
      })
    }
  }

  render(){
    const state = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}>
        <TouchableOpacity 
          style={styles.button}
          onPress={this.toggleList}>
          <Icon name="bars" size={40} style={styles.icon}/>
        </TouchableOpacity>
        {(this.state.isVisible) && <FlatList
        data={[{key:'Trợ giúp'},{key:'Liên hệ'},{key:'Tải công cụ'},{key:'Thiết lập'}]}
        renderItem={({item}) => <Text style={styles.list}>{item.key}</Text>}
        />}
        <Text style={styles.title}>Danh sách chương trình khuyến mãi</Text>
        <View style={styles.fixToText}>
          <Button title="Thêm" buttonStyle={styles.addButton}/>
          <Button title="Export" buttonStyle={styles.exportButton}/>
        </View>
        <TouchableOpacity
          style={styles.openModal}
          onPress={() => {
            this.toggleModal(true);
          }}
        >
          <View style={{flex: 0, flexDirection: 'row-reverse',alignItems:'flex-end'}}>
            <Text style={styles.filterTxt}>Open Filter</Text>
          </View>
        </TouchableOpacity>
        <Table>
          <Row data={state.tableHead} style={styles.row} textStyle={styles.textHead}/>
          <Rows data={state.tableData} style={styles.rows} textStyle={styles.text}/>
        </Table>

        <Modal
          animationType="fade"
          transparent={true}
          visible={state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalText}>Filter</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModal(!state.modalVisible);
                  }}
                >
                  <Icon name="times" size={20} style={styles.iconModal}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.modalBodyText}>Tìm kiếm</Text>
                <TextInput style={styles.modalTextInput}
                  placeholder="ID, tên chương trình"
                ></TextInput>
                <Text style={styles.modalBodyText}>Chi nhánh</Text>
                <TextInput style={styles.modalTextInput}
                  placeholder="Tên chi nhánh"
                ></TextInput>
                <View style={{flexDirection:'row'}}>
                  <CheckBox></CheckBox><Text style={{marginTop:5,fontSize:16}}>Tất cả</Text>
                </View>
                <Text style={styles.modalBodyText}>Trạng thái</Text>
                <RadioForm
                  radio_props={state.radio_props}
                  initial={0}
                  buttonSize={10}
                  onPress={(value) => {}}
                />
                <Text style={styles.modalBodyText}>Hiển thị</Text>
                <Text style={{fontSize:16}}>Số bản ghi: </Text>
                <View style={{borderWidth:2,marginLeft:10,marginRight:10}}>
                <Picker
                  selectedValue={state.valuePicker}
                  style={{height: 40}}
                  mode={'dropdown'}
                  onValueChange={(itemValue, itemIndex) =>
                    {
                      this.setState({valuePicker: itemValue})
                    }}>
                  <Picker.Item label="9" value="9" />
                  <Picker.Item label="15" value="15" />
                </Picker>
                </View>
              </View>
              <View style={styles.fixToText}>
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModal(!state.modalVisible);
                  }}
                >
                  <Text style={styles.closeTxt}>Close</Text>
                </TouchableOpacity>
                <Button title="Áp dụng" buttonStyle={styles.applyButton}/>
              </View>  
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={state.modal2Visible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => {
                      this.toggleModal2(!state.modal2Visible);
                    }}
                >
                  <Icon name="long-arrow-left" size={20} style={{marginTop:5,marginRight:5,color:'#007bff'}}/> 
                </TouchableOpacity>
                <Text style={{fontSize:20,color:'#007bff'}}>Back</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <FlatList
                  data={[
                    {id:'1',key: 'Thông tin'},
                    {id:'2',key: 'Hình thức'},
                    {id:'3',key: 'Lịch sử đặt hàng'},
                    {id:'4',key: 'Lịch sử hóa đơn'},
                  ]}
                  numColumns={3}
                  renderItem={({item}) =>
                    { 
                      return(
                        <TouchableOpacity
                          onPress={() => {
                            this.toggleTable(item.id);
                          }}
                        > 
                          <Text style={styles.infoList}>{item.key}</Text>
                        </TouchableOpacity>
                      );
                    }
                  }
                />
              </View>
              {(this.state.table1Visible) && 
                <SafeAreaView>
                  <ScrollView style={{ marginHorizontal: 20}}> 
                    <Text style={{fontSize:18}}>Mã chương trình</Text>
                    <TextInput style={styles.input1} editable={false} selectTextOnFocus={false} placeholder='KM111020'/>
                    <Text style={{fontSize:18}}>Thời gian</Text>
                    <TextInput style={styles.input1} editable={false} selectTextOnFocus={false} placeholder='11/10/2020 01:20 - 16/10/2020 01:20'/>
                    <Text style={{fontSize:18}}>Theo tháng</Text>
                    <TextInput style={styles.input1} editable={false} selectTextOnFocus={false}/>
                    <Text style={{fontSize:18}}>Theo ngày</Text>
                    <TextInput style={styles.input1} editable={false} selectTextOnFocus={false}/>
                    <Text style={{fontSize:18}}>Theo thứ</Text>
                    <TextInput style={styles.input1} editable={false} selectTextOnFocus={false}/>
                    <Text style={{fontSize:18}}>Tên chương trình</Text>
                    <TextInput style={styles.input1} editable={false} selectTextOnFocus={false} placeholder='Tưng bừng Nhà Giáo'/>
                    <Text style={{fontSize:18}}>Trạng thái</Text>
                    <RadioForm
                      radio_props={state.radio_2_props}
                      initial={0}
                      onPress={(value) => {}}
                    />
                    <Text style={{fontSize:18}}>Ghi Chú</Text>
                    <TextInput style={styles.input1} editable={false} selectTextOnFocus={false}/>
                    <View style={{flexDirection:'row',marginTop:10}}>
                      <Button title="Cập nhật" buttonStyle={styles.addButton}/>
                      <Button title="Xóa" buttonStyle={styles.delButton}/>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              }
              {(this.state.table2Visible) && 
                <SafeAreaView>
                  <ScrollView style={{ marginHorizontal: 20}}> 
                    <Text style={{fontSize:40,alignSelf:'center',color:'#007bff'}}>Hóa đơn - Giảm giá hóa đơn</Text>
                    <Table>
                      <Row data={state.table1Head} style={styles.row} textStyle={styles.textHead}/>
                      <Rows data={state.table1Data} style={styles.rows} textStyle={styles.text}/>
                    </Table>
                    <TouchableOpacity
                    onPress={() => {
                      const temp=state.table1Data;
                      temp.push(['','%','X']);
                      this.setState({
                        table1Data:temp
                      })                     
                    }}>
                    <Text style={styles.txtThemDK}>Thêm đk</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row'}}>
                      <Button title="Cập nhật" buttonStyle={styles.addButton}/>
                      <Button title="Xóa" buttonStyle={styles.delButton}/>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              }
              {(this.state.table3Visible) && 
                 <ScrollView horizontal={true}>
                 <View>
                   <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                     <Row data={state.table2Head} widthArr={[100,120,100,100,100]} style={styles.table2} textStyle={styles.txtTable3}/>
                   </Table>
                   <ScrollView style={styles.dataWrapper}>
                     <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                       {
                         state.table2Data.map((rowData, index) => (
                           <Row
                             key={index}
                             data={rowData}
                             widthArr={[100,120,100,100,100]}
                             textStyle={styles.txtRow2}
                           />
                         ))
                       }
                     </Table>
                   </ScrollView>
                 </View>
               </ScrollView>
              }
              {(this.state.table4Visible) && 
                 <ScrollView horizontal={true}>
                 <View>
                   <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                     <Row data={state.table2Head} widthArr={[100,120,100,100,100]} style={styles.table2} textStyle={styles.txtTable3}/>
                   </Table>
                   <ScrollView style={styles.dataWrapper}>
                     <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                       {
                         state.table3Data.map((rowData, index) => (
                           <Row
                             key={index}
                             data={rowData}
                             widthArr={[100,120,100,100,100]}
                             textStyle={styles.txtRow2}
                           />
                         ))
                       }
                     </Table>
                   </ScrollView>
                 </View>
               </ScrollView>
              }
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  list:{
    fontSize:20,
    padding:10
  },
  title:{
    fontSize:34,
    textAlign:"center"
  },
  fixToText:{
    flexDirection:'row',
    alignSelf:'flex-end',
    marginRight:10
  },
  addButton:{
    backgroundColor:'green',
    color:'white',
    fontWeight:'900',
    marginRight:5
  },
  exportButton:{
    backgroundColor:'#ffc107',
    color:'white',
    fontWeight:'900'
  },
  delButton:{
    backgroundColor:'#dc3545',
    color:'white',
    fontWeight:'900'
  },
  row:{
    height:70,
    width:400,
    backgroundColor:'black'
  },
  textHead:{
    fontSize:16,
    textAlign:'center',
    color:'white',
    fontWeight:'800'
  },
  text:{
    fontSize:16,
    textAlign:'center'
  },
  rows:{
    height:70
  },
  centeredView:{
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  openModal:{
    backgroundColor: '#dc3545',
    padding:5,
    borderRadius:7,
    marginBottom:5
  },
  filterTxt:{
    color:'white',
    fontWeight:'bold'
  },
  modalTitle:{
    backgroundColor:'#dc3545',
    paddingTop:30,
    paddingBottom:30,
    alignItems:'flex-start',
    flexDirection:'row'
  },
  modalText:{
    fontWeight:'bold',
    fontSize:24,
    color:'white'
  },
  iconModal:{
    alignSelf:'flex-end',
    marginLeft:330,
    marginBottom:7
  },
  modalTextInput:{
    borderWidth:1,
    fontSize:20,
    padding:5,
    marginLeft:10,
    marginRight:10
  },
  modalBodyText:{
    padding:15,
    fontSize:20
  },
  closeTxt:{
    backgroundColor:'grey',
    fontSize:20,
    padding:6,
    color:'white',
    marginTop:5,
    marginRight:5
  },
  applyButton:{
    backgroundColor:'#007bff',
    fontSize:20,
    color:'white',
    marginTop:5
  },
  modaltable:{
    alignItems:'center'
  },
  infoList:{
    fontSize:20,
    color:'#007bff',
    padding:5,
    borderLeftWidth:1,
    borderRightWidth:1
  },
  input1:{
    fontSize:16,
    borderBottomWidth:1,
    height:40,
    marginTop:-5
  },
  txtThemDK:{
    backgroundColor:'#007bff',
    padding:7,
    width:80,
    marginBottom:10,
    fontSize:16,
    color:'white',
    fontWeight:'bold'
  },
  txtTable3:{
    fontWeight:'bold',
    fontSize:16,
    alignSelf:'center',
    paddingTop:5,
    paddingBottom:5
  },
  table2:{
    paddingTop:10,
    paddingBottom:10
  },
  txtRow2:{
    paddingTop:10,
    paddingBottom:10  
  }
});

// export default App;
