import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import AppTabs from "./AppTabs";
import AuthTabs from "./AuthTabs";

const Root = () => {
  const authContext = useAuth();

  return (
    <NavigationContainer>
      {authContext.token ? <AppTabs /> : <AuthTabs />}
    </NavigationContainer>
  );
};

export default Root;
