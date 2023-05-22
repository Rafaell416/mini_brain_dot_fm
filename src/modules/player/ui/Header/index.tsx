import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../../components/Themed';
import { useColorScheme, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Colors from '../../../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMentalStatesActions } from '../../../mental_states/hooks/useMentalStates';
import { useTracksActions } from '../../hooks/useTracks';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const colorScheme = useColorScheme();
  const { clearMentalState } = useMentalStatesActions();
  const { clearTracks } = useTracksActions();

  const clear = () => {
    clearMentalState();
    clearTracks();
  };
  
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { color: Colors[colorScheme ?? 'light']?.text },
        ]}
      >
        {title}
      </Text>
      <Link href='/' asChild>
        <Pressable hitSlop={5} onPress={clear}>
          {({ pressed }) => (
            <FontAwesome
              name='chevron-down'
              size={25}
              color={Colors[colorScheme ?? 'light'].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 34, 
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10
  }
})

export default Header;