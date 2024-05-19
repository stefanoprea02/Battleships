import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import { Text } from "react-native";
import { AppParamList } from "../router/AppTabs";

type Props = BottomTabScreenProps<AppParamList>;

const Game: FC<Props> = () => {
  return <Text>Game</Text>;
};

export default Game;
