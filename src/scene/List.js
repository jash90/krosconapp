import React, {Component} from 'react';
import {View, Image, FlatList, Text, TouchableHighlight} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import selection from '../../android/app/src/main/assets/style/selection';
const Icon = createIconSetFromIcoMoon(selection);
import Spinner from 'react-native-spinkit'
import StarRating from 'react-native-star-rating';
import Color from '../Color'
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listgame: [1]
        };
    }

    componentWillMount() {
        const {navigation} = this.props;
        const item = navigation.getParam('listgame', '0');
        this.setState({listgame: item});
    }

    render() {
        return (
            <FlatList
                data={this.state.listgame}
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
        this
            .props
            .navigation
            .navigate('Item', {item: item});
    }
}
