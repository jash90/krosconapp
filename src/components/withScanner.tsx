import React from "react";
import { TouchableOpacity } from "react-native";
import { ScannerComponent } from "../components";

interface Props {
  value: boolean;
}

export const withScanner = (WrappedComponent: any) => {
  return class withScanner extends React.Component<Props> {
    public static defaultProps: Props = {
      value: false
    };

    render() {
      const { value } = this.props;

      return (
        <>
          {!value && <ScannerComponent {...this.props} />}

          {value && (
              <WrappedComponent {...this.props} />
          )}
        </>
      );
    }
  };
};
