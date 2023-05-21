import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { Text, View } from '../../src/components/Themed';
import useMentalStates from '../../src/modules/mental_states/hooks/useMentalStates';
import { State } from '../../src/modules/mental_states/types';
import { useRouter } from "expo-router";
import { useMentalStatesActions } from '../../src/modules/mental_states/hooks/useMentalStates';
//import { useMentalStatesState } from '../../src/modules/mental_states/hooks/useMentalStates';

const Card: React.FC<{ state: State }> = ({ state }) => {
  const { setCurrentMentalState } = useMentalStatesActions();
  const router = useRouter();
  
  const _handlePressCard = () => {
    router.push('/modal');
    setCurrentMentalState(state)
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={_handlePressCard}>
      <View style={styles.card}>
        <Text style={styles.title}>{state.title}</Text>
        <Text style={styles.icon}>{state.icon}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function MentalStates() {
  const states = useMentalStates()
  // const currentState = useMentalStatesState();

  // console.log({currentState})
  

  const renderItem: React.FC<{ item: State }> = ({ item }) => (
    <Card state={item}/>
  );

  return (
    <View style={styles.container}>
       <FlatList
        data={states}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#C53C86',
    height: 100,
    padding: 16,
    marginBottom: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  icon: {
    fontSize: 52,
    position: 'absolute',
    top: 10,
    right: 10
  }
});
