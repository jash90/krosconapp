import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Container } from "../components";
import { SceneProps } from "../interfaces";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  findNodeHandle,
  Image
} from "react-native";
import { RCView } from "../components/StyledComponent";
import { BlurView, VibrancyView } from "@react-native-community/blur";
interface Props extends SceneProps {
  item: any;
}

interface State {
  viewRef: any;
}

class About extends Component<Props, State> {
  public backgroundImage: any;
  constructor(props: Props) {
    super(props);
    this.state = { viewRef: null };
  }

  imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  };
  render() {
    return (
      <Container scrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text>{"Ścieżka A"}</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment={"center"}
          snapToInterval={270}
          decelerationRate="fast"
          data={[1, 2, 3, 4, 6]}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: 250,
                  height: 250,
                  marginHorizontal: 5,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 20,
                  backgroundColor: "#FFF",
                  borderRadius: 20,
                  overflow: "hidden"
                }}>
                <Text>
                  {`Mistrzowie Gry w grach pełnią rolę nieomylnych arbitrów. Jednak tak naprawdę często popełniają błędy. Szczególnie na samym początku swojej kariery.`}
                </Text>
                <View>
                  <Text>{"7 Grzechów Głównych Mistrzów Gry"}</Text>
                  <Text>{"Grzegorz Wieczorek"}</Text>
                  <Text>{"13:30 - 14:30"}</Text>
                </View>
              </View>
            );
          }}
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text>{"Ścieżka A"}</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment={"center"}
          snapToInterval={270}
          decelerationRate="fast"
          data={[1, 2, 3, 4, 6]}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: 250,
                  height: 250,
                  marginHorizontal: 5,
                  flexDirection: "column",
                  padding: 20,
                  backgroundColor: "white",
                  borderRadius: 20
                }}>
                <Text>{"7 Grzechów Głównych Mistrzów Gry"}</Text>
                <Text>{"Grzegorz Wieczorek"}</Text>
                <Text>{"13:30 - 14:30"}</Text>
                <Text>
                  {`
Mistrzowie Gry w grach pełnią rolę nieomylnych arbitrów.Jednak tak naprawdę często popełniają błędy. 
Szczególnie na samym początku swojej kariery. Najczęściej nie zdają sobie nawet sprawy, dlaczego sesja im nie wyszła, 
gdzie tak naprawdę się pomylili. Spróbujemy odnaleźć te błędy i pokazać, jak można ich unikną`.substring(
                    0,
                    148
                  ) + "..."}
                </Text>
              </View>
            );
          }}
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text>{"Ścieżka A"}</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment={"center"}
          snapToInterval={270}
          decelerationRate="fast"
          data={[1, 2, 3, 4, 6]}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: 250,
                  height: 250,
                  marginHorizontal: 5,
                  flexDirection: "column",
                  padding: 20,
                  backgroundColor: "white",
                  borderRadius: 20
                }}>
                <Text>{"7 Grzechów Głównych Mistrzów Gry"}</Text>
                <Text>{"Grzegorz Wieczorek"}</Text>
                <Text>{"13:30 - 14:30"}</Text>
                <Text>
                  {`
Mistrzowie Gry w grach pełnią rolę nieomylnych arbitrów.Jednak tak naprawdę często popełniają błędy. 
Szczególnie na samym początku swojej kariery. Najczęściej nie zdają sobie nawet sprawy, dlaczego sesja im nie wyszła, 
gdzie tak naprawdę się pomylili. Spróbujemy odnaleźć te błędy i pokazać, jak można ich unikną`.substring(
                    0,
                    148
                  ) + "..."}
                </Text>
              </View>
            );
          }}
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text>{"Ścieżka A"}</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment={"center"}
          snapToInterval={270}
          decelerationRate="fast"
          data={[1, 2, 3, 4, 6]}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: 250,
                  height: 250,
                  marginHorizontal: 5,
                  flexDirection: "column",
                  padding: 20,
                  backgroundColor: "white",
                  borderRadius: 20
                }}>
                <Text>{"7 Grzechów Głównych Mistrzów Gry"}</Text>
                <Text>{"Grzegorz Wieczorek"}</Text>
                <Text>{"13:30 - 14:30"}</Text>
                <Text>
                  {`
Mistrzowie Gry w grach pełnią rolę nieomylnych arbitrów.Jednak tak naprawdę często popełniają błędy. 
Szczególnie na samym początku swojej kariery. Najczęściej nie zdają sobie nawet sprawy, dlaczego sesja im nie wyszła, 
gdzie tak naprawdę się pomylili. Spróbujemy odnaleźć te błędy i pokazać, jak można ich unikną`.substring(
                    0,
                    148
                  ) + "..."}
                </Text>
              </View>
            );
          }}
        />
      </Container>
    );
  }
}
export default inject("authStore", "propsStore")(observer(About));
