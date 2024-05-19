import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const Button = ({ title, onPress, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#284b63",
    borderRadius: 36,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: "600",
  },
});

export default Button;
