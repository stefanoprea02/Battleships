import { StyleSheet, Text, View } from "react-native";
import { AppParamList } from "../router/AppTabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FC, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { UserResponse } from "../api/axios-service-types";
import { axiosService } from "../api/axios-service";
import Button from "../components/Button";

type Props = BottomTabScreenProps<AppParamList>;

const Profile: FC<Props> = () => {
  const auth = useAuth();
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosService.getLoggedUser();

        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [auth.token]);

  if (!user) return <></>;

  return (
    <View style={styles.container}>
      <Text style={styles.userId}>#{user.user.id}</Text>
      <Text style={styles.userDetail}>Email : {user.user.email}</Text>
      <Text style={styles.userDetail}>
        Number of games playing : {user.currentlyGamesPlaying}
      </Text>
      <Text style={styles.userDetail}>Games lost : {user.gamesLost}</Text>
      <Text style={styles.userDetail}>Games played : {user.gamesPlayed}</Text>
      <Button
        title="Log out"
        onPress={() => {
          auth.logout();
        }}
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
    padding: "10%",
    gap: 24,
  },
  userId: {
    color: "#284b63",
    fontSize: 24,
    textAlign: "center",
    position: "absolute",
    top: "10%",
  },
  userDetail: {
    color: "#284b63",
    fontSize: 18,
  },
});

export default Profile;
