import {Container as NContainer} from "native-base";
import React, {Component} from "react";
import {Text} from "react-native";
import styled from "styled-components/native";
import {ScreenContainerProps} from "../utils/interfaces";
import Head from "./Head";

interface State {
  viewRef: any;
}

class ScreenContainer extends Component<ScreenContainerProps, State> {
  public backgroundImage: any;

  static defaultProps = {
    back: true,
    left: false,
    leftIcon: "",
    leftPress: () => {},
    right: false,
    icon: "",
    scrollView: false,
    styleContent: null,
    text: false,
    children: null,
    onPress: () => {}
  };

  constructor(props: ScreenContainerProps) {
    super(props);
    this.state = {
      viewRef: null
    };
  }

  render() {
    return (
      <NContainer>
        <Head
          back={this.props.back == undefined ? true : this.props.back}
          left={this.props.left}
          leftIcon={this.props.leftIcon}
          leftPress={this.props.leftPress}
          text={this.props.text ? this.props.text : "Kroscon"}
          right={this.props.right}
          icon={this.props.icon}
          onPress={this.props.onPress}
        />
        {false && (
          <LostInternetView>
            <Text style={{ color: "white" }}>
              {"Brak połączenia z internetem"}
            </Text>
          </LostInternetView>
        )}
        {this.renderChildren()}
      </NContainer>
    );
  }

  renderChildren() {
    let Container;

    if (this.props.scrollView) {
      Container = ScrollView;
    } else {
      Container = View;
    }

    return (
      <Container styleContent={this.props.styleContent}>
        {this.props.children}
      </Container>
    );
  }
}

const ScrollView = styled.ScrollView`
  ${props =>
    !props.styleContent &&
    `
    display:flex;
    flex: 1;
    background-color: #ccc;
    padding: 0px 20px;
  `}

  ${props => !!props.styleContent && props.styleContent}
`;

const View = styled.View`
  ${props =>
    !props.styleContent &&
    `
    display:flex;
    flex: 1;
    background-color: #ccc;
    padding: 0px 20px;
  `}

  ${props => !!props.styleContent && props.styleContent}
`;

const LostInternetView = styled.View({
  backgroundColor: "red",
  paddingHorizontal: 20,
  paddingVertical: 10,
  alignItems: "center"
});

export default ScreenContainer;
