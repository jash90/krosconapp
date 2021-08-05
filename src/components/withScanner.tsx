import React from "react";
import { ScannerComponent } from "../components";

interface Props {
    value: boolean;
    error?: boolean;
}
interface State {
    validate: boolean;
}
export const withScanner = (WrappedComponent: any) => {
    return class withScanner extends React.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = {
                validate: false
            };
        }
        public static defaultProps: Props = {
            value: false
        };

        public validate() {
            this.setState({ validate: true });
        }

        public static validate(ref: any) {
            if (ref) ref.validate();
        }

        render() {
            const { value } = this.props;

            return (
                <>
                    {!value && (
                        <ScannerComponent
                            {...this.props}
                            error={this.props.error && this.state.validate}
                        />
                    )}

                    {value && <WrappedComponent {...this.props} />}
                </>
            );
        }
    };
};
