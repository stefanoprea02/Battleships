import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Game from "../screens/Game";
import Profile from "../screens/Profile";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import Table from "../screens/Table";

export type AppParamList = {
  Game: undefined;
  Table: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppParamList>();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: {
          padding: 4,
        },
        tabBarActiveTintColor: "#284b63",
        tabBarInactiveTintColor: "#d9d9d9",
      }}
    >
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="game-controller" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Table"
        component={Table}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="table-cells" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
