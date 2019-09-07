import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Toast from "react-native-simple-toast";
import { LoanGameApi } from "../api";
import Color from "../Color";
import { Button, Container, GameHeader, UserHeader } from "../components";
import { withScanner } from "../components/withScanner";
import ErrorUtil from "../ErrorUtil";
import { SceneProps } from "../interfaces";
import NavigationService from "../NavigationService";
import Scenes from "../Scenes";
const WithScannerUser = withScanner(UserHeader);
const WithScannerGame = withScanner(GameHeader);
interface State {
  user: any;
  game: any;
}

class LoanGame extends Component<SceneProps, State> {
  constructor(props: SceneProps) {
    super(props);
    this.state = {
      user: null,
      game: null
    };
  }

  componentWillMount() {
    const game = this.props.propsStore.game;
    if (!!game) this.setState({ game });

    const user = this.props.propsStore.user;
    if (!!user) this.setState({ user });
  }

  render() {
    let loan = this.state.game === null;
    if (this.state.game && this.state.game.loanGames) {
      loan = this.state.game.loanGames.length === 0;
    }
    if (
      this.state.game &&
      this.state.game.loanGames &&
      this.state.game.loanGames[0]
    ) {
      loan = this.state.game.loanGames[0].endLoan != null;
    }
    console.log(this.state.game);
    console.log(loan);
    return (
      <Container text={loan ? "Wypożycz grę" : "Oddaj grę"}>
        <WithScannerGame
          value={!!this.state.game}
          game={this.state.game}
          onPress={() => {
            this.props.propsStore.setTypeItem(1);
            this.props.propsStore.setRouteName(Scenes.LoanGame);
            NavigationService.navigate(Scenes.Camera);
          }}
        />
        {loan && (
          <WithScannerUser
            user={this.state.user}
            value={!!this.state.user}
            onPress={() => {
              this.props.propsStore.setTypeItem(2);
              this.props.propsStore.setRouteName(Scenes.LoanGame);
              NavigationService.navigate(Scenes.Camera);
            }}
          />
        )}
        <Button
          text={loan ? "Wypożycz grę" : "Oddaj grę"}
          primary
          color={Color.accentColor}
          colorText={"white"}
          onPress={() => this.success(loan)}
        />
      </Container>
    );
  }
  success = (loan: boolean) => {
    if (loan) {
      const { game, user } = this.state;
      if (!game || !user) {
        Toast.show(
          "Musisz zeskanować kod qr użytkownika i/lub kod gry, żeby wypożyczyć grę."
        );
        return;
      }
      LoanGameApi.add(
        this.state.user.id,
        this.props.authStore.id,
        this.state.game.id
      )
        .then(item => {
          Toast.show("Gra została wypożyczona.");
          NavigationService.reset(Scenes.List);
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    } else {
      const { game } = this.state;
      if (!game) {
        Toast.show(
          "Musisz zeskanować kod qr użytkownika i/lub kod gry, żeby wypożyczyć grę."
        );
      }
      const loanGame = this.state.game.loanGames[0];
      LoanGameApi.edit(loanGame.id, this.props.authStore.id)
        .then(item => {
          Toast.show("Gra została oddana.");
          NavigationService.reset(Scenes.List);
        })
        .catch(error => {
          ErrorUtil.errorService(error);
        });
    }
  };
}
export default inject("authStore", "propsStore")(observer(LoanGame));
