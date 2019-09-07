import AuthStore from "./stores/AuthStore";

import PropsStore from "./stores/PropsStore";

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

interface SceneProps extends Props{
    authStore:AuthStore;
    propsStore:PropsStore;
}

export { Props, TextProps, ButtonProps, PickerIconProps, HeadProps, ContainerProps, SceneProps };