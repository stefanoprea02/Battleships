import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Position, Ship } from "../types";
import { useState } from "react";

type GridProps = {
  ships: Ship[];
  selectedShip: Ship | null;
  placeShip: ({ x, y }: Position) => void;
  removeShip: ({ x, y }: Position) => void;
};

const Grid = ({ ships, selectedShip, placeShip, removeShip }: GridProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const positionsTaken: Position[] = [];

  ships.map((ship) => {
    const copy = { ...ship };
    positionsTaken.push({ x: ship.x, y: ship.y });
    copy.size--;
    while (copy.size) {
      if (ship.direction === "HORIZONTAL") {
        positionsTaken.push({
          x: String.fromCharCode(ship.x.charCodeAt(0) + ship.size - copy.size),
          y: ship.y,
        });
      } else {
        positionsTaken.push({ x: ship.x, y: ship.y + ship.size - copy.size });
      }
      copy.size--;
    }
  });

  const verifyValidPosition = ({ x, y }: Position) => {
    if (!selectedShip) {
      setErrorMessage("Please select a ship");
      return;
    }

    const { size, direction } = { ...selectedShip };
    let remainingSize = size;
    const isHorizontal = direction === "HORIZONTAL";

    while (remainingSize > 0) {
      const newX = isHorizontal
        ? String.fromCharCode(x.charCodeAt(0) + size - remainingSize)
        : x;
      const newY = isHorizontal ? y : y + size - remainingSize;

      const isOutOfBounds =
        (isHorizontal && newX > "J") || (!isHorizontal && newY > 10);
      if (isOutOfBounds) {
        setErrorMessage("Out of bounds");
        return;
      }

      const positionTaken = positionsTaken.some(
        (position) => position.x === newX && position.y === newY
      );
      if (positionTaken) {
        setErrorMessage("Position taken");
        return;
      }

      remainingSize--;
    }

    setErrorMessage("");
    placeShip({ x, y });
  };

  const onGridPress = ({
    x,
    y,
    isPositionTaken,
  }: Position & { isPositionTaken: boolean }) => {
    selectedShip
      ? verifyValidPosition({
          x,
          y,
        })
      : isPositionTaken &&
        removeShip({
          x,
          y,
        });
  };

  const rows = Array.from({ length: 11 }, (_, row) => {
    const rowNumber = 10 - row;
    return (
      <View key={row.toString()} style={styles.row}>
        {row !== 10 ? (
          <>
            <View key={`grid-${row}`} style={styles.labelLeft}>
              <Text>{rowNumber}</Text>
            </View>
            {Array.from({ length: 10 }, (_, cell) => {
              const columnChar = String.fromCharCode(65 + cell);
              const isPositionTaken = positionsTaken.find(
                (postion) => postion.x === columnChar && postion.y === rowNumber
              )
                ? true
                : false;

              return (
                <TouchableOpacity
                  onPress={() =>
                    onGridPress({
                      x: columnChar,
                      y: rowNumber,
                      isPositionTaken,
                    })
                  }
                  key={`grid-${row}-${cell}`}
                  style={styles.cell}
                >
                  <Text>{isPositionTaken ? "X" : ""}</Text>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          Array.from({ length: 10 }, (_, cell) => (
            <View
              key={`grid-${cell.toString()}`}
              style={[styles.labelDown, { left: `${cell * 10}%` }]}
            >
              <Text>{String.fromCharCode(65 + cell)}</Text>
            </View>
          ))
        )}
      </View>
    );
  });

  return (
    <View style={styles.grid}>
      {rows}
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    display: "flex",
    height: "50%",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
  },
  labelLeft: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    height: "100%",
    left: "-10%",
  },
  labelDown: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    height: "100%",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    height: "100%",
    backgroundColor: "#ccf7ff",
    borderWidth: 0.5,
    borderColor: "grey",
  },
});

export default Grid;
