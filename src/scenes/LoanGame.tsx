import React, { Component } from "react";
import { Button, Container, GameHeader, UserHeader } from "../components";
import { withScanner } from "../components/withScanner";
import Scenes from "../Scenes";
import { LoanGameApi } from "../api";
import { observer, inject } from "mobx-react";
import AuthStore from "../stores/AuthStore";
import Toast from "react-native-simple-toast";
import { StackActions, NavigationActions } from "react-navigation";
const WithScannerUser = withScanner(UserHeader);
const WithScannerGame = withScanner(GameHeader);
interface State {
  user: any;
  game: any;
}
interface Props {
  authStore: AuthStore;
}

class LoanGame extends Component<Props, State> {
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
    let loan = false;
    loan = this.state.game.loanGames.length === 0;
    if (this.state.game.loanGames && this.state.game.loanGames[0]) {
      loan = this.state.game.loanGames[0].endLoan != null;
    }
    console.log(this.state.game);
    console.log(loan);
    return (
      <Container
        text={loan ? "Wypożycz grę" : "Oddaj grę"}
        navigation={this.props.navigation}>
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
        {loan && (
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
        )}
        <Button
          text={loan ? "Wypożycz grę" : "Oddaj grę"}
          primary
          color={"red"}
          colorText={"white"}
          onPress={() => this.success(loan)}
        />
      </Container>
    );
  }
  success = (loan: boolean) => {
    if (loan) {
      LoanGameApi.add(
        this.state.user.id,
        this.props.authStore.id,
        this.state.game.id
      ).then(item => {
        Toast.show("Gra została wypożyczona.");
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: Scenes.List})]
        });
        this.props.navigation.dispatch(resetAction);
      });
    } else {
      const loanGame = this.state.game.loanGames[0];
      LoanGameApi.edit(loanGame.id, 1).then(item => {
        Toast.show("Gra została oddana.");
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: Scenes.List })]
        });
        this.props.navigation.dispatch(resetAction);
      });
    }
  };
}

export default inject("authStore")(observer(LoanGame));
