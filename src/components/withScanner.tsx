import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ScannerComponent } from "../components";

interface Props {
  loading: boolean;
  value:boolean;
  sizeIndicator?: number | "small" | "large";
  colorIndicator?: string;
}

export const withScanner = (WrappedComponent: any) => {
  return class withScanner extends React.Component<Props> {
    public static defaultProps: Props = {
      loading: false,
      value:false,
      sizeIndicator: "large",
      colorIndicator: "black"
    };

    render() {
      const { loading, sizeIndicator, colorIndicator, value } = this.props;

      return (
        <View style={{
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            margin: 20,
            borderWidth:1
          }}>
          {value && <WrappedComponent {...this.props}/>} 

          {!value && <ScannerComponent {...this.props} />}
        </View>
      );
    }
  };
};
