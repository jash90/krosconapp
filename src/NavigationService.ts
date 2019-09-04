import { NavigationActions } from 'react-navigation';
import { NavigationContainerComponent, NavigationRoute, NavigationScreenProp } from 'react-navigation';

export default class NavigationService {
  static navigator: NavigationContainerComponent;

  public static setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
    this.navigator = navigatorRef;
  }

  public static navigate(routeName: any, params: any|null = null) {
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  }

}