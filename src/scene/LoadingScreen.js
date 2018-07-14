import React, {Component} from 'react';
import {View, Image} from 'react-native';
import Spinner from 'react-native-spinkit'
import Color from '../Color'
import { NavigationActions } from 'react-navigation';
export default class LoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount = () => {
        fetch('https://bgg-json.azurewebsites.net/collection/edwalter').then((response) => response.json()).then((responseJson) => {
            this
                .props
                .navigation
                .push('List', {listgame: responseJson});
            const navigateAction = NavigationActions.navigate({
                

                params: { listgame: responseJson },

                action: NavigationActions.navigate({ routeName: 'List'} ),
            });

            this.props.navigation.dispatch(navigateAction);
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <View
                style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: Color.secondaryColor,
                justifyContent: 'center'
            }}>
                <View
                    style={{
                    backgroundColor: 'transparent',
                    alignItems: 'center'
                }}>
                    <View
                        style={{
                        backgroundColor: 'white',
                        padding: 15,
                        borderRadius: 360
                    }}>
                        <Image
                            style={{
                            width: 100,
                            height: 100
                        }}
                            source={require('../img/muffin.png')}/>
                    </View>
                    <Spinner isVisible={true} color={'white'} size={100} type={'ThreeBounce'}/>
                </View>
            </View>
        );
    }
}
