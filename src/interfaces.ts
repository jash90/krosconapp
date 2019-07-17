import { string, any } from "prop-types";

interface Props { };

interface TextProps extends Props {
    text: string;
};

interface ButtonProps extends TextProps {
    onPress: () => any;
};

interface PickerIconProps {
    onChange: (item: any) => any;
    select: string;
};

interface HeadProps extends ButtonProps {
    back: boolean;
    left: boolean;
    leftIcon: string;
    leftPress: () => any;
    right: boolean;
    icon: string;
}

interface ContainerProps extends HeadProps{
    styleContent: any;
    scrollView: boolean;
};

export { Props, TextProps, ButtonProps, PickerIconProps, HeadProps, ContainerProps };