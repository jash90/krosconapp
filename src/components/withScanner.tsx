import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ScannerComponent } from "../components";

interface Props {
  loading: boolean;
  value: boolean;
  sizeIndicator?: number | "small" | "large";
  colorIndicator?: string;
}

export const withScanner = (WrappedComponent: any) => {
  return class withScanner extends React.Component<Props> {
    public static defaultProps: Props = {
      loading: false,
      value: false,
      sizeIndicator: "large",
      colorIndicator: "black"
    };

    render() {
      const { loading, sizeIndicator, colorIndicator, value } = this.props;

      return (
        <>
          {!value && <ScannerComponent {...this.props} />}

          {value && <WrappedComponent {...this.props} />}
        </>
      );
    }
  };
};
