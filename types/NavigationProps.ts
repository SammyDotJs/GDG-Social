import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PostsType} from '../screens/Tabs/Home/HomeScreen';

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Tabs: undefined;
  ProfileScreen: undefined;
  PostDetails: PostsType;
  DetailsScreen: {};
};

export interface IPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
