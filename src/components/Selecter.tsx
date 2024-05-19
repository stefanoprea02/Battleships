import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Ship } from "../types";
import { useState } from "react";
import Button from "./Button";

type SelecterProps = {
  ships: Ship[];
  updateSelectedShip: (ship: Ship) => void;
  selectedShip: Ship | null;
};

const Selecter = ({
  ships,
  updateSelectedShip,
  selectedShip,
}: SelecterProps) => {
  const availableShips = Array.from({ length: 4 }, (_, i) => {
    if (ships.find((ship) => ship.size === i + 1)) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() =>
          updateSelectedShip({
            size: i + 1,
            x: selectedShip?.x || "",
            y: selectedShip?.y || 0,
            direction: selectedShip?.direction || "HORIZONTAL",
          })
        }
        style={styles.shipSelecterOption}
        key={`select-ship-${i + 1}`}
      >
        {Array.from({ length: i + 1 }, (_, j) => (
          <View key={`select-ship-${i + 1}-${j}`} style={styles.shipCell}>
            <Text>X</Text>
          </View>
        ))}
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          {
            flexDirection:
              selectedShip?.size && selectedShip?.direction === "HORIZONTAL"
                ? "column"
                : "row",
          },
        ]}
      >
        <Text>Selected ship</Text>
        <View
          style={{
            flexDirection:
              selectedShip?.direction === "HORIZONTAL" ? "row" : "column",
          }}
        >
          {selectedShip &&
            Array.from({ length: selectedShip.size }, (_, j) => (
              <View key={`${j}`} style={styles.shipCell}>
                <Text>X</Text>
              </View>
            ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          const direction =
            selectedShip?.direction === "HORIZONTAL"
              ? "VERTICAL"
              : "HORIZONTAL";
          updateSelectedShip({
            size: selectedShip?.size || 0,
            x: selectedShip?.x || "",
            y: selectedShip?.y || 0,
            direction: direction,
          });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Change selected ship direction</Text>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <Text>Available ships</Text>
        <View style={styles.shipSelecter}>{availableShips}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  shipSelecter: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  shipSelecterOption: {
    flexDirection: "row",
  },
  shipCell: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccf7ff",
    borderWidth: 0.5,
    borderColor: "grey",
    height: 25,
    width: 25,
  },
  button: {
    backgroundColor: "#284b63",
    padding: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Selecter;
