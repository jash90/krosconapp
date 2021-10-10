import Scenes from './utils/Scenes';
import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export default class NavigationService {
  public static navigationRef = createNavigationContainerRef();

  public static navigate(routeName: Scenes, params: any | null = null) {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(StackActions.push(routeName, params));
    }
  }

  public static goBack() {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(CommonActions.goBack());
    }
  }

  public static reset(routeName: Scenes) {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(StackActions.replace(routeName));
    }
  }
}
