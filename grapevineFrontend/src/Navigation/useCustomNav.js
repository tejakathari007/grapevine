import { useNavigation } from '@react-navigation/native';

export const useCustomNav = () => {
  const navigation = useNavigation();

  const goTo = (to) => navigation.navigate(to);

  return { goTo };
};
