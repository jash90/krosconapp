import AuthStore from "../stores/AuthStore";
import PropsStore from "../stores/PropsStore";

export interface TextProps {
  text: string;
}

export interface ButtonProps extends TextProps {
  onPress: () => any;
}

export interface FabProps {
  onPress: () => any;
  icon: string;
}

export interface PickerIconProps {
  onChange: (item: any) => any;
  select: string;
}

export interface HeadProps extends ButtonProps {
  back: boolean;
  left: boolean;
  leftIcon: string;
  leftPress: () => any;
  right: boolean;
  icon: string;
}

export interface ScreenContainerProps extends HeadProps {
  styleContent: any;
  scrollView: boolean;
}

export interface SceneProps {
  authStore: AuthStore;
  propsStore: PropsStore;
}
