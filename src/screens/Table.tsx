import { StyleSheet, View, Text } from "react-native";
import { AppParamList } from "../router/AppTabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FC, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Position, Ship } from "../types";
import Grid from "../components/Grid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Selecter from "../components/Selecter";

type Props = BottomTabScreenProps<AppParamList>;

const Table: FC<Props> = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);

  useEffect(() => {
    const getStoredShips = async () => {
      const storedShips = await AsyncStorage.getItem("ships");
      if (storedShips) {
        setShips(JSON.parse(storedShips));
      }
    };

    if (ships.length === 0) getStoredShips();
  }, []);

  useEffect(() => {
    const storeShips = async () => {
      await AsyncStorage.setItem("ships", JSON.stringify(ships));
    };

    storeShips();
  }, [ships]);

  const placeShip = async ({ x, y }: Position) => {
    setShips([
      ...ships,
      {
        x,
        y,
        size: selectedShip!.size,
        direction: selectedShip!.direction,
      },
    ]);
    setSelectedShip(null);
  };

  const removeShip = ({ x, y }: Position) => {
    setShips(
      ships.filter((ship) => {
        const copy = { ...ship };
        while (copy.size) {
          if (ship.direction === "HORIZONTAL") {
            if (
              x ===
                String.fromCharCode(
                  ship.x.charCodeAt(0) + ship.size - copy.size
                ) &&
              y === ship.y
            ) {
              return false;
            }
          } else {
            if (x === ship.x && y === ship.y + ship.size - copy.size) {
              return false;
            }
          }
          copy.size--;
        }
        return true;
      })
    );
  };

  return (
    <View style={styles.container}>
      <Grid
        ships={ships}
        selectedShip={selectedShip}
        placeShip={placeShip}
        removeShip={removeShip}
      />
      <Selecter
        ships={ships}
        updateSelectedShip={(ship: Ship) => setSelectedShip(ship)}
        selectedShip={selectedShip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10%",
    gap: 24,
  },
});

export default Table;
