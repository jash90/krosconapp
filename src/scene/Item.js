import React, {Component} from 'react';
import {View, Image, FlatList, Text, ScrollView} from 'react-native';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import selection from '../../android/app/src/main/assets/style/selection';
const Icon = createIconSetFromIcoMoon(selection);
import Spinner from 'react-native-spinkit'
import StarRating from 'react-native-star-rating';
import Container from "@components/container";
export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listgame: [1]
        };
    }
    componentWillMount() {}

    render() {
        const item = this.props.item;
        return (
            <Container scrollView={true}>
                <View
                    style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    margin: 20
                }}>
                    <View
                        style={{
                        width: '100%',
                        flexDirection: 'row'
                    }}>
                        <Image
                            source={{
                            uri: item.image
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
                </View>
                <View
                    style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20
                }}>
                    <FlatList
                        data={this.getTags()}
                        horizontal={true}
                        contentContainerStyle={{
                        flex: 1,
                        flexWrap: "wrap"
                    }}
                        renderItem={({item}) => <View
                        style={{
                        margin: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: 'black'
                    }}>
                        <Text>{item}</Text>
                    </View>}/>
                </View>
                <View
                    style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20
                }}>
                    <Text>
                        {this.loremtext()}
                    </Text>
                </View>
                <View
                    style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20
                }}></View>
            </Container>
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
    loremtext() {
        return ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor placerat o" +
                "rci, ut ullamcorper tellus scelerisque nec. Nullam accumsan, nunc sit amet susci" +
                "pit cursus, neque ligula sodales orci, sit amet cursus nulla velit sit amet lore" +
                "m. Vestibulum et elementum elit. Quisque ligula neque, aliquet vitae ultricies n" +
                "ec, commodo sed arcu. Duis pretium quam a ultricies convallis. In tristique elit" +
                " tortor. Donec vulputate justo eget lorem accumsan mattis. Donec laoreet diam eu" +
                " odio mollis, ut finibus ipsum porta. Ut sagittis tincidunt ipsum, a placerat ve" +
                "lit condimentum sed. Sed accumsan erat in lacus efficitur tempus. Vestibulum dic" +
                "tum dignissim ultricies. Nunc pellentesque interdum accumsan. Pellentesque leo m" +
                "assa, porttitor eu pretium eget, lobortis a dolor. Suspendisse suscipit, lectus " +
                "nec tincidunt tempus, ex ipsum vulputate tellus, at bibendum lacus velit non lig" +
                "ula.Curabitur malesuada at quam tempus vehicula.Mauris congue dui est, id luctus" +
                " risus tempor sit amet.Ut sit amet nibh ipsum.Praesent vitae turpis rutrum, blan" +
                "dit velit at, maximus urna.Quisque mollis feugiat quam sed lacinia.Donec consect" +
                "etur, urna ac venenatis sagittis, elit nibh posuere eros, at rutrum ipsum lectus" +
                " quis libero.Aliquam feugiat, sem sit amet placerat molestie, est ante gravida e" +
                "x, sagittis ullamcorper ante lectus quis eros.Donec finibus justo quis mi dapibu" +
                "s consectetur at quis metus.Nullam sed metus a nulla finibus auctor.Fusce vitae " +
                "augue euismod nisl semper tempus.Curabitur vel efficitur velit.")
    }
    getTags() {
        return ([
            "Lorem",
            "ipsum",
            "dolor",
            "sit",
            "amet",
            "consectetur",
            "adipiscing",
            "elit",
            "Nunc",
            "eleifend",
            "tincidunt",
            "ultricies",
            "Aenean",
            "ac",
            "diam",
            "posuere",
            "vestibulum",
            "mauris",
            "at",
            "tristique",
            "arcu"
        ])
    }
}
