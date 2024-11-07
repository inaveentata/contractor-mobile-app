import { StyleSheet, View } from 'react-native';
import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';
import { router } from 'expo-router';

export default function TabTwoScreen() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Button onPress={handleSignOut} text="Sign out" />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
