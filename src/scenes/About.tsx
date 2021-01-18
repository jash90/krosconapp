import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {Dimensions, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import EventApi from "../api/EventApi";
import Color from "../Color";
import {Container} from "../components";
import {RCViewFlex} from "../components/StyledComponent";
import {SceneProps} from "../interfaces";

interface Props extends SceneProps {
    item: any;
}

interface State {
    event: any;
    subString: number | undefined;
}

class About extends Component<Props, State> {
    public backgroundImage: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            event: null,
            subString: 120
        };
    }

    componentDidMount = async () => {
        const response = await EventApi.all();
        this.setState({ event: response.data.items[0] });
    };

    render() {
        const width = Dimensions.get("window").width - 80;
        return (
            <Container
                scrollView
                styleContent={{ flex: 1, backgroundColor: Color.primaryColor }}
                text={this.state.event ? this.state.event.name : "Kroscon"}>
                <View style={{ paddingHorizontal: 20 }}>
                    <RCViewFlex>
                        <Image
                            style={{ width: width, height: width / 2 }}
                            source={{
                                uri:
                                    "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/66632974_502509490290663_466426426074071040_o.jpg?_nc_cat=109&_nc_oc=AQmNoh3Je2jjZ8vSN1AQb4mqrSUNcuBSeXQUJTran5oXuVR5HRpoEtcOWI8F9oWF8eQ&_nc_ht=scontent-frx5-1.xx&oh=2454fe38d4acae9517a2665c22014d41&oe=5DFB62CD"
                            }}
                            resizeMode={"contain"}
                        />
                    </RCViewFlex>
                    <RCViewFlex style={{ flexDirection: "column" }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                paddingBottom: 5
                            }}>
                            {this.state.event
                                ? this.state.event.name
                                : "Kroscon"}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold" }}>
                                Lokalizacja:{" "}
                            </Text>
                            <Text>Strzyżów</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold" }}>
                                Czas trwania:{" "}
                            </Text>
                            <Text>20.08.2019r. - 22.08.2019r.</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "bold" }}>Wstęp: </Text>
                            <Text>bezpłatny</Text>
                        </View>
                    </RCViewFlex>
                    <RCViewFlex style={{ flexDirection: "column" }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                paddingBottom: 5
                            }}>
                            Opis
                        </Text>
                        <Text>
                            {!this.state.event
                                ? ""
                                : String(
                                      this.state.event.description
                                  ).substring(0, this.state.subString)}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.subString === undefined) {
                                    this.setState({ subString: 120 });
                                } else {
                                    this.setState({ subString: undefined });
                                }
                            }}
                            style={{
                                borderRadius: 10,
                                backgroundColor: "white",
                                borderWidth: 1,
                                padding: 3,
                                alignSelf: "flex-start",
                                marginVertical: 5
                            }}>
                            <Text style={{ paddingHorizontal: 5 }}>
                                {this.state.subString === undefined
                                    ? "Zwiń"
                                    : "Rozwiń"}
                            </Text>
                        </TouchableOpacity>
                    </RCViewFlex>
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            paddingBottom: 5
                        }}>
                        {"Harmonogram"}
                    </Text>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment={"center"}
                    snapToInterval={270}
                    decelerationRate="fast"
                    data={[1, 2, 3, 4, 6]}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingBottom: 20
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    width: 250,
                                    height: 250,
                                    marginHorizontal: 5,
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: 20,
                                    backgroundColor: "#FFF",
                                    borderRadius: 20,
                                    overflow: "hidden"
                                }}>
                                <Text>
                                    {`Mistrzowie Gry w grach pełnią rolę nieomylnych arbitrów. Jednak tak naprawdę często popełniają błędy. Szczególnie na samym początku swojej kariery.`}
                                </Text>
                                <View>
                                    <Text>
                                        {"7 Grzechów Głównych Mistrzów Gry"}
                                    </Text>
                                    <Text>{"Grzegorz Wieczorek"}</Text>
                                    <Text>{"13:30 - 14:30"}</Text>
                                </View>
                            </View>
                        );
                    }}
                />
            </Container>
        );
    }
}
export default inject("authStore", "propsStore")(observer(About));
