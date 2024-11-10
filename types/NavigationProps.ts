import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Tabs: undefined;
};

export interface IPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
