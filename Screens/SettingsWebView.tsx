import { styles } from '../styles';
import { View, Text, Switch } from 'react-native';
interface SettingsWebViewProps {
  isAuth: boolean;
  toggleAuthKey: () => void;
}
const SettingsWebView = ({ isAuth, toggleAuthKey }: SettingsWebViewProps) => {
  return (
    <View style={styles.toggleSmartFastView}>
      <Text style={styles.toggleSmartFastText}>
        Acces by 'Google Auth' or 'Key'. Now is {isAuth ? 'Google Auth' : 'Key'}
      </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isAuth ? '#7d7da1' : '#cdc5ff'}
        onValueChange={toggleAuthKey}
        value={isAuth}
        style={styles.toggleSwitch}
      />
    </View>
  );
};

export default SettingsWebView;
