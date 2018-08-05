import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Text,
  FlatList
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Container from "@components/container";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection";
const Icon = createIconSetFromIcoMoon(selection);
import { Dropdown } from "react-native-material-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      extraData: 5,
      visible: false,
      date: new Date(),
      date2: 2000,
      time:new Date(),
      time2:15,
      visible2:false
    };
  }
  render() {
    return (
      <Container scrollView={true}>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <FlatList
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center"
            }}
            extraData={this.state.extraData}
            data={this.createArray(this.state.extraData, 10)}
            horizontal={true}
            renderItem={(item, index) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ extraData: item.index + 1 });
                }}
              >
                <Icon
                  name={"pawn"}
                  size={25}
                  color={item.item ? "red" : "black"}
                />
              </TouchableOpacity>
            )}
          />
          <View>
            <Text style={{ fontSize: 25, color: "red" }}>
              {this.state.extraData}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Dropdown
            containerStyle={{ width: "100%" }}
            label="Maksymalna ilość graczy"
            data={[
              {
                value: 1
              },
              {
                value: 2
              },
              {
                value: 3
              },
              {
                value: 4
              },
              {
                value: 5
              },
              {
                value: 6
              },
              {
                value: 7
              },
              {
                value: 8
              },
              {
                value: 9
              },
              {
                value: 10
              }
            ]}
            value={this.state.extraData}
            onChangeText={text => {
              this.setState({ extraData: text });
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <TouchableOpacity style={{width:'100%', flexDirection:"row", justifyContent:"space-between"}} onPress={() => this.setState({ visible: true })}>
            <Text style={{ fontSize: 25, color: "black" }}>
              {"Data wydania:"}
            </Text>
            <Text style={{ fontSize: 25, color: "black" }}>
              {Moment(this.state.date).format("YYYY")}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.visible}
            onConfirm={date => this.setState({ date: date, visible: false })}
            onCancel={() => this.setState({ visible: false })}
          />
        </View>
            <View
                style={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Dropdown
                    containerStyle={{ width: "100%" }}
                    label="Data wydania"
                    data={[
                        {
                            value: 2001
                        },
                        {
                            value: 2002
                        },
                        {
                            value: 2003
                        },
                        {
                            value: 2004
                        },
                        {
                            value: 2005
                        },
                        {
                            value: 2006
                        },
                        {
                            value: 2007
                        },
                        {
                            value: 2008
                        },
                        {
                            value: 2009
                        },
                        {
                            value: 2010
                        }
                    ]}
                    value={this.state.date2}
                    onChangeText={text => {
                        this.setState({ date2: text });
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    margin: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <TouchableOpacity style={{ width: '100%', flexDirection: "row", justifyContent: "space-between" }} onPress={() => this.setState({ visible2: true })}>
                    <Text style={{ fontSize: 25, color: "black" }}>
                        {"Czas trwania:"}
                    </Text>
                    <Text style={{ fontSize: 25, color: "black" }}>
                        {Moment(this.state.time).format("HH:mm")}
                    </Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode={"time"}
                    isVisible={this.state.visible2}
                    onConfirm={date => this.setState({ time: date, visible2: false })}
                    onCancel={() => this.setState({ visible2: false })}
                />
            </View>
            <View
                style={{
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 20,
                    margin: 20,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Dropdown
                    containerStyle={{ width: "100%" }}
                    label="Czas trwania (minuty)"
                    data={[
                        {
                            value: 30
                        },
                        {
                            value: 45
                        },
                        {
                            value: 60
                        },
                        {
                            value: 80
                        },
                        {
                            value: 100
                        },
                        {
                            value: 120
                        },
                        {
                            value: 140
                        },
                        {
                            value: 160
                        },
                        {
                            value: 180
                        },
                        {
                            value: 200
                        }
                    ]}
                    value={this.state.time2}
                    onChangeText={text => {
                        this.setState({ time2: text });
                    }}
                />
            </View>
      </Container>
    );
  }
  createArray(number, max) {
    return new Array(number)
      .fill(true)
      .concat(new Array(max - number).fill(false));
  }
}
