/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
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
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';



class ListScreen extends Component {
  constructor(props) {
    super(props);
    const elementButton = (value) => (
      <TouchableOpacity onPress={() => this.setState({modal2Visible:true,table1Visible:true})}>
        <View style={styles.modaltable}>
          <Text style={{fontWeight:'bold'}}>{value}</Text>
        </View>
      </TouchableOpacity>
    );
    const elementID = (value) => (
        <View style={styles.modaltable}>
          <Text style={{fontWeight:'bold'}}>{value}</Text>
        </View>
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
        [elementID(''), '', '','800.000','720.000'],
        [elementID('DH00001'), '20/11/2020 14:51', 'Admin','500.000','450.000'],
        [elementID('DH00002'), '20/11/2020 17:21', 'Admin','300.000','270.000'],
      ],
      table3Head: ['Mã phiếu', 'Thời gian', 'Người bán','Tổng tiền','Giảm giá khuyến mãi'],
      table3Data: [
        [elementID(''), '', '','1.000.000','900.000'],
        [elementID('HD00001'), '20/11/2020 14:51', 'Admin','500.000','450.000'],
        [elementID('HD00002'), '20/11/2020 17:21', 'Admin','500.000','450.000'],
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
          <Button title="Thêm" buttonStyle={styles.addButton} onPress={() => this.props.navigation.push('Add')}/>
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
        <Table borderStyle={{borderWidth: 2 , borderColor:'#efefef'}}>
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
                      <Rows data={state.table1Data} style={styles.rows} textStyle={styles.text}  borderStyle={{borderWidth: 2 , borderColor:'#efefef'}}/>
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
                 <View style={{marginTop:15}}>
                   <Table >
                     <Row data={state.table2Head} widthArr={[100,130,100,100,100]} style={styles.table2} textStyle={styles.txtTable3}/>
                   </Table>
                   <ScrollView style={styles.dataWrapper}>
                     <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                       {
                         state.table2Data.map((rowData, index) => {
                          if (index == 0){
                            return (
                              <Row
                                key={index}
                                data={rowData}
                                widthArr={[100,130,100,100,100]}
                                style={{backgroundColor:'#ffe4c4'}}
                                textStyle={styles.txtRow2}
                              />
                             )  
                          }
                          else{
                            return (
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={[100,130,100,100,100]}
                              textStyle={styles.txtRow2}
                            />
                            )
                          }
                         })
                       }
                     </Table>
                   </ScrollView>
                 </View>
               </ScrollView>
              }
              {(this.state.table4Visible) && 
                 <ScrollView horizontal={true}>
                 <View style={{marginTop:15}}>
                   <Table >
                     <Row data={state.table3Head} widthArr={[100,130,100,100,100]} style={styles.table2} textStyle={styles.txtTable3}/>
                   </Table>
                   <ScrollView style={styles.dataWrapper}>
                     <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                       {
                         state.table3Data.map((rowData, index) => {
                          if (index == 0){
                            return (
                              <Row
                                key={index}
                                data={rowData}
                                widthArr={[100,130,100,100,100]}
                                style={{backgroundColor:'#ffe4c4'}}
                                textStyle={styles.txtRow2}
                              />
                             )  
                          }
                          else{
                            return (
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={[100,130,100,100,100]}
                              textStyle={styles.txtRow2}
                            />
                            )
                          }
                         })
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

class AddScreen extends Component {
  
  constructor(props) {
    super(props);
    const elementItem = (value) => {
      if (value == 'sl'){
        return(
          <View style={{flexDirection:'row',marginLeft:10}}>
          <TextInput style={{fontWeight:'bold',width:50,borderWidth:1,padding:-5,alignSelf:'center'}}></TextInput>
          <Icon name="bars" size={20} style={styles1.iconTable}/>
          </View>
        )
      }
      else if (value == '%'){
        return(
          <View style={{flexDirection:'row',marginLeft:10}}>
          <TextInput style={{fontWeight:'bold',width:50,borderWidth:1,padding:-5,alignSelf:'center'}}></TextInput>
          <Icon name="percent" size={20} style={styles1.iconTable}/>
          </View>
        )
      }
      else {
        return(
          <View style={{flexDirection:'row',marginLeft:10}}>
          <TextInput style={{fontWeight:'bold',width:50,borderWidth:1,padding:-5,alignSelf:'center'}}></TextInput>
          </View>
        )
      }
    };
    this.state = {
      valuePicker1:'Hóa đơn',
      valuePicker2:'Giảm giá hóa đơn',
      valuePicker4:'Quận 1',
      valuePicker5:'VIP',
      isVisible: false,
      isVisible2:false,
      isVisible3: false,
      isVisible4:false,
      date1Visible:false,
      date2Visible:false,
      date3Visible:false,
      time1Visible:false,
      radio_2_props: [
        {label: 'Kích hoạt', value: 0 },
        {label: 'Chưa kích hoạt', value: 1 },
      ],
      radio_3_props: [
        {label: 'Tất cả chi nhánh', value: 0 },
        {label: 'Chi nhánh:', value: 1 },
      ],
      radio_4_props: [
        {label: 'Tất cả khách hàng', value: 0 },
        {label: 'Nhóm khách hàng:', value: 1 },
      ],
      tableHead: ['Tổng tiền', 'Giảm giá', ''],
      tableData: [
        [elementItem(''), elementItem('%'), 'X'],
      ],
      date1:(new Date()),
      date2:(new Date()),
      time1:(new Date()),
      date4:''
    }
  }

  
  toggleList = event => {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  toggleList2 = event => {
    this.setState({
      isVisible2: !this.state.isVisible2
    });
  }

  toggleList3 = event => {
    this.setState({
      isVisible3: !this.state.isVisible3
    });
  }

  toggleList4 = event => {
    this.setState({
      isVisible4: !this.state.isVisible4
    });
  }
  
  toggleDate1 = event => {
    this.setState({
      date1Visible: !this.state.date1Visible
    });
  }

  toggleDate2 = event => {
    this.setState({
      date2Visible: !this.state.date2Visible
    });
  }

  toggleDate3 = event => {
    this.setState({
      date3Visible: !this.state.date3Visible
    });
  }

  toggleTime1 = event => {
    this.setState({
      time1Visible: !this.state.time1Visible
    });
  }

  handleConfirm1 = (date) => {
    this.setState({
      date1: date
    });
  };

  handleConfirm2 = (date) => {
    this.setState({
      date2: date
    });
  };

  handleConfirm3 = (date) => {
    this.setState({
      time1: date
    });
  };

  handleClose = event => {};

  elementItem = (value) => {
    if (value == 'sl'){
      return(
        <View style={{flexDirection:'row',marginLeft:10}}>
        <TextInput style={{fontWeight:'bold',width:50,borderWidth:1,padding:-5,alignSelf:'center'}}></TextInput>
        <Icon name="bars" size={20} style={styles1.iconTable}/>
        </View>
      )
    }
    else if (value == '%'){
      return(
        <View style={{flexDirection:'row',marginLeft:10}}>
        <TextInput style={{fontWeight:'bold',width:50,borderWidth:1,padding:-5,alignSelf:'center'}}></TextInput>
        <Icon name="percent" size={20} style={styles1.iconTable}/>
        </View>
      )
    }
    else {
      return(
        <View style={{flexDirection:'row',marginLeft:10}}>
        <TextInput style={{fontWeight:'bold',width:50,borderWidth:1,padding:-5,alignSelf:'center'}}></TextInput>
        </View>
      )
    }
  };

  //APPP SCREEN
  render(){
    const state = this.state;
    return (
        <SafeAreaView style={{backgroundColor:'white'}}>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}>
            <TouchableOpacity 
              style={styles1.button}
              onPress={this.toggleList}>
              <Icon name="bars" size={40} style={styles1.icon}/>
            </TouchableOpacity>
            {(this.state.isVisible) && <FlatList
            data={[{key:'Trợ giúp'},{key:'Liên hệ'},{key:'Tải công cụ'},{key:'Thiết lập'},{key:'Tài khoản'}]}
            renderItem={({item}) => <Text style={styles1.list}>{item.key}</Text>}
            />}
          </View>
          <ScrollView>
            <Text style={styles1.title}>Thêm chương trình khuyến mãi</Text>
            <View style={{flexDirection:'row'}}>
              <View style={{marginLeft:20}}>
                <TextInput style={styles1.txtInput} editable={false} selectTextOnFocus={false} placeholder='KM120520'/>
                <TextInput style={styles1.txtInput} editable={false} selectTextOnFocus={false} placeholder='Tên chương trình'/>
                <Text style={{fontSize:20,padding:10,marginTop:20,marginLeft:-8}}>Trạng thái</Text>
                <RadioForm
                  radio_props={state.radio_2_props}
                  initial={0}
                  onPress={(value) => {}}
                />
              </View>
              <View style={{marginLeft:50,marginTop:30}}>
                <Text style={styles1.ghichu}>Ghi chú</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={12}
                  textAlignVertical = "top"
                  style={styles1.txtArea}/>
              </View>
            </View>
            <TouchableOpacity 
              onPress={this.toggleList2}>
              <Text style={styles1.txtClick}>Hình thức khuyến mãi</Text>
            </TouchableOpacity>
            {(this.state.isVisible2) && 
              <View>
                <Text style={{fontSize:16,padding:10,marginLeft:15}}>Khuyến mãi theo: </Text>
                <View style={{borderWidth:2,marginLeft:20,marginRight:20}}>
                  <Picker
                    selectedValue={state.valuePicker1}
                    style={{height: 40}}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                      {
                        this.setState({valuePicker1: itemValue});
                        if (state.valuePicker2=='Giảm giá mặt hàng' && itemValue=='Hàng hóa'){
                          this.setState({
                            tableHead: ['SL / Nhóm (hàng) mua', 'Giảm giá', 'SL / Nhóm (hàng) được giảm',''],
                            tableData: [
                              [this.elementItem('sl'), this.elementItem('%'),this.elementItem('sl'),'X'],
                            ],
                          })
                        }
                        else{
                          this.setState({
                            tableHead: ['Tổng tiền', 'Giảm giá', ''],
                            tableData: [
                              [this.elementItem(''), this.elementItem('%'), 'X'],
                            ],
                          })
                        }
                      }}>
                    <Picker.Item label="Hóa đơn" value="Hóa đơn" />
                    <Picker.Item label="Hàng hóa" value="Hàng hóa" />
                  </Picker>
                </View>
                <Text style={{fontSize:16,padding:10,marginLeft:15}}>Hình thức: </Text>
                <View style={{borderWidth:2,marginLeft:20,marginRight:20,marginBottom:20}}>
                  <Picker
                    selectedValue={state.valuePicker2}
                    style={{height: 40}}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                      {
                        this.setState({valuePicker2: itemValue});
                        if (state.valuePicker1=='Hàng hóa' && itemValue=='Giảm giá mặt hàng'){
                          this.setState({
                            tableHead: ['SL / Nhóm (hàng) mua', 'Giảm giá', 'SL / Nhóm (hàng) được giảm',''],
                            tableData: [
                              [this.elementItem('sl'), this.elementItem('%'),this.elementItem('sl'),'X'],
                            ],
                          })
                        }
                        else{
                          this.setState({
                            tableHead: ['Tổng tiền', 'Giảm giá', ''],
                            tableData: [
                              [this.elementItem(''), this.elementItem('%'), 'X'],
                            ],
                          })
                        }
                      }}>
                    <Picker.Item label="Giảm giá hóa đơn" value="Giảm giá hóa đơn" />
                    <Picker.Item label="Giảm giá mặt hàng" value="Giảm giá mặt hàng" />
                  </Picker>
                </View>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                  <Row data={state.tableHead} style={styles1.row} textStyle={styles1.textHead}/>
                  <Rows data={state.tableData} style={styles1.rows} textStyle={styles1.textData}/>
                </Table>
                <TouchableOpacity
                  style={{marginLeft:15}}
                  onPress={() => {
                    const temp=state.tableData;
                    if (state.tableHead.length == 3){
                      temp.push([this.elementItem(''), this.elementItem('%'), 'X']);  
                    }
                    else{
                      temp.push([this.elementItem('sl'), this.elementItem('%'),this.elementItem('sl'),'X']);
                    }
                    this.setState({
                      tableData:temp
                    })                     
                  }}>
                <Text style={styles1.txtThemDK}>Thêm đk</Text>
                </TouchableOpacity>
              </View>
            }
            <TouchableOpacity 
              onPress={this.toggleList3}>
              <Text style={styles1.txtClick}>Chi nhánh áp dụng</Text>
            </TouchableOpacity>
            {(this.state.isVisible3) && 
              <View style={{marginLeft:20,marginTop:20}}>
                <RadioForm
                  radio_props={state.radio_3_props}
                  initial={0}
                  onPress={(value) => {}}
                />
                <View style={{borderWidth:2,marginRight:20,marginBottom:20}}>
                  <Picker
                    selectedValue={state.valuePicker4}
                    style={{height: 40}}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                      {
                        this.setState({valuePicker4: itemValue})
                      }}>
                    <Picker.Item label="Quận 1" value="Quận 1" />
                    <Picker.Item label="Quận 2" value="Quận 2" />
                    <Picker.Item label="Quận 3" value="Quận 3" />
                  </Picker>
                </View>
                <RadioForm
                  radio_props={state.radio_4_props}
                  initial={0}
                  onPress={(value) => {}}
                />
                <View style={{borderWidth:2,marginRight:20,marginBottom:20}}>
                  <Picker
                    selectedValue={state.valuePicker5}
                    style={{height: 40}}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                      {
                        this.setState({valuePicker5: itemValue})
                      }}>
                    <Picker.Item label="VIP" value="VIP" />
                    <Picker.Item label="Thường" value="Thường" />
                  </Picker>
                </View>
              </View>
            }
            <TouchableOpacity 
              onPress={this.toggleList4}>
              <Text style={styles1.txtClick}>Thời gian áp dụng</Text>
            </TouchableOpacity>
            {(this.state.isVisible4) && 
              <View>
                <Text style={styles1.txtTimeArea}>Thời gian:</Text>
                <TouchableOpacity 
                  onPress={this.toggleDate1}>
                  <Text style={styles1.txtDate}>{Moment(state.date1).format('DD / MM / YYYY   hh:mm')}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={state.date1Visible}
                  mode="datetime"
                  onConfirm={this.handleConfirm1}
                  onCancel={this.handleClose}
                />
                <Text style={styles1.txtTimeArea}>Đến:</Text>
                <TouchableOpacity 
                  onPress={this.toggleDate2}>
                  <Text style={styles1.txtDate}>{Moment(state.date2).format('DD / MM / YYYY   hh:mm')}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={state.date2Visible}
                  mode="datetime"
                  onConfirm={this.handleConfirm2}
                  onCancel={this.handleClose}
                />
                <Text style={styles1.txtTimeArea}>Theo tháng:</Text>
                <TextInput style={styles1.txtDate} placeholder='mm/yyyy, cách dấu phẩy'></TextInput>
                <Text style={styles1.txtTimeArea}>Theo ngày:</Text>
                <TextInput style={styles1.txtDate} placeholder='dd/mm, cách dấu phẩy'></TextInput>
                <View style={{flexDirection:'row',marginLeft:20,marginTop:5,width:330}}>
                  <CheckBox></CheckBox><Text style={{marginTop:5,fontSize:20}}>Áp dụng vào ngày sinh nhật khách hàng</Text>
                </View>
                <Text style={styles1.txtTimeArea}>Theo thứ:</Text>
                <TextInput style={styles1.txtDate} placeholder='mm/yyyy, cách dấu phẩy'></TextInput>
                <Text style={styles1.txtTimeArea}>Theo giờ:</Text>
                <TouchableOpacity 
                  onPress={this.toggleTime1}>
                  <Text style={styles1.txtDate}>{Moment(state.time1).format('hh:mm')}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={state.time1Visible}
                  mode="time"
                  onConfirm={this.handleConfirm3}
                  onCancel={this.handleClose}
                />  
                <View style={{flexDirection:'row',marginLeft:20,marginTop:5,width:330}}>
                  <CheckBox></CheckBox><Text style={{marginTop:5,fontSize:20}}>Cảnh báo khách hàng khuyến mãi này đã được hưởng</Text>
                </View>
              </View>
            }
            <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:10}}>
              <Button title="Lưu" buttonStyle={styles1.saveButton}/>
              <Button title="Hủy" buttonStyle={styles1.cancelButton}/>
            </View>
          </ScrollView>
        </SafeAreaView>
    );
  };
};

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Add" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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
    textAlign:"center",
    color:'#2d006d'
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
    backgroundColor:'#391054',
  },
  textHead:{
    fontSize:16,
    textAlign:'center',
    color:'white',
    fontWeight:'800',
  },
  text:{
    fontSize:16,
    textAlign:'center'
  },
  rows:{
    height:70,
    backgroundColor:'white'
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
    borderRightWidth:2,
    backgroundColor:'white'
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
    paddingBottom:5,
    color:'white'
  },
  table2:{
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#391054'
  },
  txtRow2:{
    paddingTop:15,
    paddingBottom:15  
  },
});

const styles1 = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  list:{
    fontSize:20,
    padding:5
  },
  title:{
    fontSize:34,
    textAlign:"center",
    color:'#2d006d'
  },
  txtInput:{
    borderBottomWidth:1,
    fontSize:20,
    marginTop:20
  },
  txtArea:{
    borderWidth:1,
    width:150,
    marginTop:-10
  },
  ghichu:{
    fontSize:20,
    marginLeft:20,
    backgroundColor:'white',
    width:100,
    paddingLeft:10,
    paddingRight:7,
    zIndex:1
  },
  txtClick:{
    backgroundColor:'#BB6BD9',
    fontSize:30,
    alignSelf:'center',
    color:'white',
    width:370,
    marginTop:10,
    paddingLeft:15
  },
  saveButton:{
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:'#4CAF50',
    borderRadius:5,
    marginRight:5
  },
  cancelButton:{
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:'#6c757d',
    borderRadius:5,
    marginRight:20,
    marginBottom:100
  },
  row:{
    borderWidth:1,
    height:'auto',
    width:400,
    backgroundColor:'#391054',
  },
  rows:{
    borderWidth:1,
    height:50,
    width:400
  },
  textHead:{
    alignSelf:'center',
    fontSize:20,
    color:'white',
    paddingTop:10,
    paddingBottom:10
  },
  textData:{
    alignSelf:'center',
    fontSize:20
  },
  txtThemDK:{
    backgroundColor:'#007bff',
    padding:5,
    color:'white',
    fontWeight:'bold',
    width:70,
    marginTop:10,
    marginLeft:10
  },
  txtDate:{
    marginLeft:20,
    width:370,
    fontSize:20,
    padding:5,
    borderWidth:2
  },
  txtTimeArea:{
    marginTop:10,
    marginLeft:20,
    fontSize:20,
    fontWeight:'bold'
  },
  iconTable:{
    alignSelf:'center',
    backgroundColor:'#6c757d',
    padding:5
  }
})
// export default App;
