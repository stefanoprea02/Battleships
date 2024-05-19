import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Authenticate from "../screens/Authenticate";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

export type AuthParamList = {
  Login: { screenType: "login" };
  Register: { screenType: "register" };
};

const Tab = createBottomTabNavigator<AuthParamList>();

const AuthTabs = () => {
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
        name="Login"
        component={Authenticate}
        initialParams={{ screenType: "login" }}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="login" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={Authenticate}
        initialParams={{ screenType: "register" }}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="news" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthTabs;
