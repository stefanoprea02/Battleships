import { StatusBar } from "expo-status-bar";
import { AuthContextProvider } from "./src/hooks/useAuth";
import Root from "./src/router/root";
import { SafeAreaView } from "react-native";
import Constants from "expo-constants";

export default function App() {
  return (
    <AuthContextProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <StatusBar />
        <Root />
      </SafeAreaView>
    </AuthContextProvider>
  );
}
