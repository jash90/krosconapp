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
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection";
const Icon = createIconSetFromIcoMoon(selection);
import { Dropdown } from "react-native-material-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
import { Container } from "../components";
import { Props } from "../interfaces";
interface State {
  image: any;
  extraData: number;
  visible: boolean;
  date: Date;
  date2: number;
  time: Date;
  time2: number;
  visible2: boolean;
  age: string;
}
export default class Example extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      image: null,
      extraData: 5,
      visible: false,
      date: new Date(),
      date2: 2000,
      time: new Date(),
      time2: 15,
      visible2: false,
      age: ""
    };
  }
  render() {
    return (
      <Container navigation={this.props.navigation} scrollView={true}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "center"
          }}>
          <FlatList<any>
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center"
            }}
            extraData={this.state.extraData}
            data={this.createArray(this.state.extraData, 10)}
            horizontal={true}
            renderItem={(item: any) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ extraData: item.index + 1 });
                }}>
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
            justifyContent: "center",
            alignItems: "center"
          }}>
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
            onChangeText={(text: number) => {
              this.setState({ extraData: text });
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <TouchableOpacity
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
            onPress={() => this.setState({ visible: true })}>
            <Text style={{ fontSize: 25, color: "black" }}>
              {"Data wydania:"}
            </Text>
            <Text style={{ fontSize: 25, color: "black" }}>
              {Moment(this.state.date).format("YYYY")}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.visible}
            onConfirm={(date: any) =>
              this.setState({ date: date, visible: false })
            }
            onCancel={() => this.setState({ visible: false })}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
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
            onChangeText={(text: number) => {
              this.setState({ date2: text });
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <TouchableOpacity
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
            onPress={() => this.setState({ visible2: true })}>
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
            onConfirm={(date: any) =>
              this.setState({ time: date, visible2: false })
            }
            onCancel={() => this.setState({ visible2: false })}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
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
            onChangeText={(text: number) => {
              this.setState({ time2: text });
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text style={{ fontSize: 25, color: "black" }}>Wiek</Text>
          <TextInput
            style={{ fontSize: 25, textAlign: "right" }}
            keyboardType="phone-pad"
            value={this.state.age}
            maxLength={2}
            onChangeText={text => this.setState({ age: text })}
          />
          <Text style={{ fontSize: 25, color: "black" }}>+</Text>
        </View>
      </Container>
    );
  }
  createArray(number: number, max: number) {
    return new Array(number).map(() => true).concat(new Array(max - number).map(() => false));
  }
}
