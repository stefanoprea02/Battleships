import React, { FC, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AuthParamList } from "../router/AuthTabs";
import { PostAuth } from "../api/axios-service-types";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";

type Props = BottomTabScreenProps<AuthParamList>;

const Authenticate: FC<Props> = ({ route }: Props) => {
  const { screenType } = route.params;
  const [userDetails, setUserDetails] = useState<PostAuth>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();

  const authenticate = async () => {
    const data = {
      email: userDetails.email,
      password: userDetails.password,
    };
    let errorResponse = undefined;

    if (screenType === "login") {
      errorResponse = await auth.login(data);
    } else {
      errorResponse = await auth.register(data);
    }

    console.log(errorResponse);

    if (errorResponse && errorResponse.data.message) {
      setErrorMessage(errorResponse.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battleships</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={userDetails.email}
          onChangeText={(email) => {
            setUserDetails((prev) => {
              return { ...prev, email: email };
            });
          }}
          placeholder="Email"
          style={styles.input}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          value={userDetails.password}
          onChangeText={(password) => {
            setUserDetails((prev) => {
              return { ...prev, password: password };
            });
          }}
          placeholder="Password"
          style={styles.input}
        ></TextInput>
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <Button
        onPress={authenticate}
        title={screenType === "login" ? "Sign in" : "Sign up"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    padding: "10%",
  },
  title: {
    color: "#284b63",
    fontSize: 48,
    fontWeight: "800",
  },
  inputContainer: {
    width: "100%",
    gap: 12,
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderColor: "#284b63",
    color: "#284b63",
    borderWidth: 0.4,
    borderRadius: 16,
  },
  errorMessage: {
    color: "#ff595e",
    marginTop: -12,
  },
});

export default Authenticate;
