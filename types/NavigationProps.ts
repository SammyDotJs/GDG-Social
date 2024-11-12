import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {PostsType} from '../screens/Tabs/Home/HomeScreen';

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Tabs: undefined;
  PostDetails: PostsType;
  DetailsScreen: {};
};

export interface IPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
