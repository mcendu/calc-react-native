import { Button, Pressable, StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  buttonPad: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    paddingVertical: 4,
    gap: 8,
  },
  button: {
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  largeButton: {
    flex: 2,
  },
  label: {
    fontSize: 28,
  },
});

const buttonColorSchemes = {
  normal: {
    backgroundColor: "#eeeeee",
    activeColor: "#dddddd",
    color: "#090909",
  },
  action: {
    backgroundColor: "#0090ff",
    activeColor: "#0080e0",
    color: "#f0f0f0",
  },
};

function CalculatorButton(props) {
  const { style, type, onPress, title } = props;

  const colorScheme = buttonColorSchemes[type] ?? buttonColorSchemes.normal;
  const colorSchemeStyles = {
    button: {
      backgroundColor: colorScheme.backgroundColor,
    },
    buttonActive: {
      backgroundColor: colorScheme.activeColor,
    },
    text: {
      color: colorScheme.color,
    },
  };

  const buttonStyle = ({pressed}) =>
    StyleSheet.compose(
      StyleSheet.compose(
        styles.button,
        pressed ? colorSchemeStyles.buttonActive : colorSchemeStyles.button
      ),
      style
    );
  const labelStyle = StyleSheet.compose(styles.label, colorSchemeStyles.text);

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={labelStyle}>{title}</Text>
    </Pressable>
  );
}

export default function ButtonPad(props) {
  const { onInput } = props;

  return (
    <View style={styles.buttonPad}>
      <View style={styles.row}>
        <CalculatorButton
          onPress={() => onInput("clear")}
          type="action"
          title="C"
        />
        <CalculatorButton
          onPress={() => onInput("negate")}
          type="action"
          title={"\u00b1"}
        />
        <CalculatorButton
          onPress={() => onInput("remainder")}
          type="action"
          title="%"
        />
        <CalculatorButton
          onPress={() => onInput("divide")}
          type="action"
          title={"\u00f7"}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => onInput("1")} title="1" />
        <CalculatorButton onPress={() => onInput("2")} title="2" />
        <CalculatorButton onPress={() => onInput("3")} title="3" />
        <CalculatorButton
          onPress={() => onInput("multiply")}
          type="action"
          title={"\u00d7"}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => onInput("4")} title="4" />
        <CalculatorButton onPress={() => onInput("5")} title="5" />
        <CalculatorButton onPress={() => props.onInput("6")} title="6" />
        <CalculatorButton
          onPress={() => props.onInput("subtract")}
          type="action"
          title={"\u2212"}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => props.onInput("7")} title="7" />
        <CalculatorButton onPress={() => props.onInput("8")} title="8" />
        <CalculatorButton onPress={() => props.onInput("9")} title="9" />
        <CalculatorButton
          onPress={() => props.onInput("add")}
          type="action"
          title="+"
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => props.onInput("0")} title="0" />
        <CalculatorButton onPress={() => props.onInput(".")} title="." />
        <CalculatorButton
          onPress={() => props.onInput("calculate")}
          type="action"
          style={styles.largeButton}
          title="="
        />
      </View>
    </View>
  );
}
