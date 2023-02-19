import { useQueryClient } from 'react-query';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { getToken } from '../../API/Google/getToken';
import { getUserInfo } from '../../API/Google/getUserInfo';
import ValidateEmail from '../Auth/isEmailValid';
import { getYoutubeVideos } from '../../API/Google/getYoutubeVideos';
const BuyGrapes = () => {
  const queryClient = useQueryClient();

  const buyGrapes = async ({ name, price, number }) => {
    try {
      const rename = name.split(' ');
      const loggedUser = JSON.parse(await AsyncStorage.getItem('user'));
      const token = loggedUser.token;

      const result = await WebBrowser.openAuthSessionAsync(
        `https://admin.grapevine-app.co/stripe/buy-grape?redirect=${Linking.createURL(
          ''
        )}&name=${rename.map(
          (n) => n + '%20'
        )}&price=${price}&number=${number}&token=${token}`,
        Linking.createURL('')
      );
      console.log(result);
      if (result.url) {
        const data = Linking.parse(result.url);
        if (data.queryParams.success == 'true') {
          queryClient.invalidateQueries('LoginUserInfo');
          Toast.show('Payment Successfull', {
            duration: Toast.durations.SHORT,
          });
        } else {
          Toast.show('Something went wrong', {
            duration: Toast.durations.SHORT,
          });
        }
      }
    } catch (err) {
      Toast.show(err.message, {
        duration: Toast.durations.SHORT,
      });
      console.log(err, 'error');
    }
  };

  return buyGrapes;
};
export default BuyGrapes;
