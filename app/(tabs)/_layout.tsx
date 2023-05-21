import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '../../src/constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const background = Colors[colorScheme ?? 'light']?.background

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light']?.tint,
        headerStyle: {
          backgroundColor: background,
        },
        headerTitleStyle: {
          color: Colors[colorScheme ?? 'light']?.text,
          fontSize: 34, 
          fontWeight: 'bold',
          marginTop: 10,
          marginLeft: 10
        },
        headerTitleAlign: 'left',
        tabBarStyle: {
          backgroundColor: background
        },
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mental States',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
