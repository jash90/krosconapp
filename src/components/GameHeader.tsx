import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    StyleSheet
} from "react-native";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import selection from "../../android/app/src/main/assets/style/selection.json";
const Icon = createIconSetFromIcoMoon(selection);
import StarRating from "react-native-star-rating";
import { withNavigation } from 'react-navigation';
interface Game {
    name: string;
    thumbnail: string;
    averageRating: number;
    minPlayers: number;
    maxPlayers: number;
    playingTime: number
}

interface Props {
    item: Game
    navigation: any
}
export default class GameHeader extends Component<Props> {
    render() {
        const { name, thumbnail, averageRating, minPlayers, maxPlayers, playingTime } = this.props.item;
        return (
            <TouchableHighlight onPress={() => this.openItem(this.props.item)}>
                <View
                    style={{
                     
                       height:200,
                        flexDirection: "row",
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 20,
                        margin:20
                    }}>
                    <Image
                        source={{
                            uri: thumbnail
                        }}
                        resizeMode={"contain"}
                        style={{
                            width: 150,
                            height: 150
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            padding: 10,
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }}>
                        <Text
                            style={{
                                width: "100%",
                                fontSize: 18,
                                textAlign: "center"
                            }}>
                            {name}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                height: 25,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <StarRating
                                disabled={true}
                                maxStars={10}
                                rating={averageRating}
                                starSize={15}
                                fullStarColor={"#FFEE58"}
                                halfStarColor={"#FFEE58"}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row"
                            }}>
                            {this.renderPawn(minPlayers, maxPlayers)}
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                height: 30,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Icon name={"time"} size={20} />
                            <Text>
                                {`${playingTime} min`}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    renderPawn(min: number, max: number) {
        var table = [];
        for (var i = 0; i < max; i++) {
            if (i < min) {
                table.push(<Icon size={15} name={"pawn"} color={"black"} />);
            } else {
                table.push(<Icon size={15} name={"pawn"} color={"gray"} />);
            }
        }
        return table;
    }
    openItem(item: any) {
        this.props.navigation.navigate({ routeName: 'Item', params: { item: item } });
    }
}