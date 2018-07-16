import React, {Component} from 'react';
import {View, Image, FlatList, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {Fab, Button, Icon as NIcon} from 'native-base';
import selection from '../../android/app/src/main/assets/style/selection';
const Icon = createIconSetFromIcoMoon(selection);
import Spinner from 'react-native-spinkit'
import StarRating from 'react-native-star-rating';
import Color from '../Color'
import {Actions} from "react-native-router-flux";
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    componentWillMount() {}

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <FlatList
                    data={this.props.listgame}
                    renderItem={({item}) => <TouchableHighlight onPress={() => this.openItem(item)}>
                    <View
                        style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20,
                        margin: 20,
                        marginBottom: 0
                    }}>
                        <Image
                            source={{
                            uri: item.thumbnail
                        }}
                            resizeMode={'contain'}
                            style={{
                            width: 150,
                            height: 150
                        }}/>
                        <View
                            style={{
                            flex: 1,
                            padding: 10,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <Text
                                style={{
                                width: '100%',
                                fontSize: 18,
                                textAlign: 'center'
                            }}>
                                {item.name}
                            </Text>
                            <View
                                style={{
                                flexDirection: 'row',
                                height: 25,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <StarRating
                                    disabled={true}
                                    maxStars={10}
                                    rating={item.averageRating}
                                    starSize={15}
                                    fullStarColor={'#FFEE58'}
                                    halfStarColor={'#FFEE58'}/>
                            </View>
                            <View
                                style={{
                                flexDirection: 'row'
                            }}>
                                {this.renderPawn(item.minPlayers, item.maxPlayers)}
                            </View>
                            <View
                                style={{
                                flexDirection: 'row',
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon name={'time'} size={20}/>
                                <Text>{item.playingTime}
                                    min</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>}/>
                <Fab
                    active={this.state.active}
                    style={{
                    backgroundColor: '#5067FF'
                }}
                    position="bottomRight"
                    onPress={()=>Actions.Camera()}>
                    <NIcon name="camera"/>
                </Fab>
            </View>
        );
    }
    renderPawn(min, max) {
        var table = [];
        for (var i = 0; i < max; i++) {
            if (i < min) {
                table.push(<Icon size={15} name={'pawn'} color={'black'}/>);
            } else {
                table.push(<Icon size={15} name={'pawn'} color={'gray'}/>);
            }
        }
        return table;
    }
    openItem(item) {
        Actions.Item({item: item});
    }
}
