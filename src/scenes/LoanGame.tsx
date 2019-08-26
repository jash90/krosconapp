import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Container, GameHeader, UserHeader } from "../components";
import { withScanner } from "../components/withScanner";
import Scenes from "../Scenes";
import { Props } from "../interfaces";

const WithScannerUser = withScanner(UserHeader);
const WithScannerGame = withScanner(GameHeader);
interface State {
  user: any;
  game: any;
}
export default class LoanGame extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: null,
      game: null
    };
  }

  componentWillMount() {
    const game =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.game
        ? this.props.navigation.state.params.game
        : null;
    if (!!game) this.setState({ game });

    const user =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.user
        ? this.props.navigation.state.params.user
        : null;
    if (!!user) this.setState({ user });
  }

  render() {
    return (
      <Container text={"Wypożycz grę"} navigation={this.props.navigation}>
        <WithScannerGame
          navigation={this.props.navigation}
          value={!!this.state.game}
          game={this.state.game}
          onPress={() =>
            this.props.navigation.navigate(Scenes.Camera, {
              changeCode: (game: any) => this.setState({ game }),
              routeName: Scenes.LoanGame,
              typeItem: 1
            })
          }
        />
        <WithScannerUser
          navigation={this.props.navigation}
          user={this.state.user}
          value={!!this.state.user}
          onPress={() =>
            this.props.navigation.navigate(Scenes.Camera, {
              changeCode: (user: any) => this.setState({ user }),
              routeName: Scenes.LoanGame,
              typeItem: 2
            })
          }
        />
        <Button
          text={"Wypożycz Grę"}
          primary
          color={"red"}
          colorText={"white"}
          onPress={this.success}
        />
      </Container>
    );
  }
  success = () => {
    this.props.navigation.navigate(Scenes.LoanStatus);
  };
}

var styles = StyleSheet.create({
  fullStyle: {
    flex: 1
  }
});
