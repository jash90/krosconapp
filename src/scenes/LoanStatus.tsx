import React, { Component } from "react";

import {Icon} from "native-base";
import Color from '../Color';
import { Button, Container } from "../components";
import { View, Text } from "react-native";

export default class LoanStatus extends Component {
  render() {
    const error = false;
    const color = error ? Color.accentColor : 'green';
    const icon = error ? 'close-circle-outline': 'checkmark';
    return (
      <Container
        text={"Wypożycz grę"}
        navigation={this.props.navigation}
        styleContent={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} style={{fontSize: 200,color:color}} />
        </View>
        <View style={{padding:20, margin:20}}>
            <Text style={{color:color, textAlign:'justify'}}>
                {!error && `Udało ci się wypożyczyć grę. Życzymy udanej rozgrywki!`}
                {error && `Nie udało ci się wypożyczyć grę. Spróbuj ponownie, bądź skonsultuj się z administratorem!`}
            </Text>
        </View>
        {error && <Button text={"Spróbuj ponownie"} primary color={"red"} colorText={'white'}/>}
        <Button text={"Powrót"} outline color={"red"} />
      </Container>
    );
  }
}
