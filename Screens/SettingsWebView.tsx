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
        Access by{`\n`} Google Auth
      </Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isAuth ? '#7d7da1' : '#cdc5ff'}
        onValueChange={toggleAuthKey}
        value={isAuth}
        style={styles.toggleSwitch}
      />
      <Text style={styles.toggleSmartFastText}>
        GPT Key{`\n`} Now is
        {`\n`} {isAuth ? "'Google Auth'" : "'GPT Key'"}
      </Text>
    </View>
  );
};

export default SettingsWebView;
