import { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '../src/components/Themed';
import Header from '../src/modules/player/ui/Header';
import { useMentalStatesState } from '../src/modules/mental_states/hooks/useMentalStates';
import Colors from '../src/constants/Colors';
import useTracks from '../src/modules/player/hooks/useTracks';
import { getEndpoint } from '../src/config/getEndpoint';

import { Audio, AVPlaybackStatus } from 'expo-av';

export default function ModalScreen() {
  const soundRef = useRef(new Audio.Sound()).current;
  const isMounted = useRef(false);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  console.log({status})

  const API_ENDPOINT = getEndpoint();

  const currentMentalState = useMentalStatesState();
  const colorScheme = useColorScheme();

  const themedColor = Colors[colorScheme ?? 'light'].text;
  const {loading, error, tracks, currentTrack, nextTrack} = useTracks();
  //const source = loading ? null : `${API_ENDPOINT}${tracks[0]?.path}`

  console.log({loading, error, currentTrack})

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (currentTrack !== null) {
      const source = `${API_ENDPOINT}${currentTrack?.path}`
      soundRef
        .loadAsync({uri: source})
        .then((playbackStatus) => {
          if (isMounted.current === true) {
            setStatus(playbackStatus);
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    }

    soundRef.setOnPlaybackStatusUpdate((status) => {
      if (isMounted.current === true) {
        setStatus(status);
      }
    });

    return () => {
      soundRef.unloadAsync();
    };
  }, [currentTrack]);

  const iconName = status?.isPlaying ? 'pause' : 'play';

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
              onPress={() => (status.isPlaying ? soundRef.pauseAsync() : soundRef.playAsync())}
            >
              <FontAwesome
                name={iconName}
                size={30}
                color={themedColor}
              />
            </TouchableOpacity>
          <View style={styles.skipButtonContainer}>
            <TouchableOpacity activeOpacity={0.5} hitSlop={5} onPress={nextTrack}>
              <FontAwesome
                name="step-forward"
                size={30}
                color={themedColor}
              />
            </TouchableOpacity>
          </View>
      </View>
      <View style={styles.trackNameContainer}>
        <Text style={styles.trackName}>{currentTrack?.title}</Text>
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
