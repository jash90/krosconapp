import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Container, GameHeader, UserHeader } from "../components";
import { withScanner } from "../components/withScanner";
import Scenes from "../Scenes";
import { Props } from "../interfaces";

const WithScannerUser = withScanner(UserHeader);
const WithScannerGame = withScanner(GameHeader);
interface State {
  value: boolean;
  game: any;
}
export default class LoanGame extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: false,
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
              routeName: Scenes.LoanGame
            })
          }
        />
        <WithScannerUser
          navigation={this.props.navigation}
          firstname={"Bartłomiej"}
          lastname={"Zimny"}
          email={"bartekziimny90@gmail.com"}
          allLoan={9}
          age={25}
          city={"Strzyżów"}
          countLoan={1}
          value={this.state.value}
          loading={false}
          onPress={() =>
            setTimeout(() => {
              this.setState({ value: true });
            }, 3000)
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
