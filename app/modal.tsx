import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text, View } from '../src/components/Themed';
import Header from '../src/modules/player/ui/Header';
import { useMentalStatesState } from '../src/modules/mental_states/hooks/useMentalStates';
import Colors from '../src/constants/Colors';

import useTracks from '../src/modules/player/hooks/useTracks';

export default function ModalScreen() {
  const [play, setPlay] = useState(false);
  const currentMentalState = useMentalStatesState();
  const colorScheme = useColorScheme();
  const themedColor = Colors[colorScheme ?? 'light'].text;
  const {loading, error, tracks} = useTracks();

  console.log({loading, error, tracks})

  const iconName = play ? "play" : "pause";

  const _togglePlay = () => {
    setPlay(!play)
  }

  return (
    <View style={styles.container}>
      <Header title={`Music to ${currentMentalState?.mentalState?.title}`}/>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{currentMentalState?.mentalState?.icon}</Text>
      </View>
      <View style={styles.playerContainer}>
        <View style={styles.skipButtonContainer} />
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.playPauseButton, {borderColor: themedColor}]}
            onPress={_togglePlay}
          >
            <FontAwesome
              name={iconName}
              size={30}
              color={themedColor}
            />
          </TouchableOpacity>
          <View style={styles.skipButtonContainer}>
            <TouchableOpacity activeOpacity={0.5} hitSlop={5}>
              <FontAwesome
                name="step-forward"
                size={30}
                color={themedColor}
              />
            </TouchableOpacity>
          </View>
      </View>
      <View style={styles.trackNameContainer}>
        <Text style={styles.trackName}>Track name</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 200,
  },
  playerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playPauseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 40 
  },
  skipButtonContainer: {
    flex: 1,
    alignItems: 'center'
  },
  trackNameContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 45
  },
  trackName: {
    fontSize: 20,
    fontWeight: '600'
  }
});
