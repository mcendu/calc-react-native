import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Display from "./Display";
import ButtonPad from "./ButtonPad";
import { useRef, useState } from "react";
import Parser from "./parser/Parser";

export default function App() {
  const [number, setNumber] = useState("0");
  const [equation, setEquation] = useState("");
  const parser = useRef(new Parser());

  function pushToken(token) {
    parser.current.push(token);
    setNumber(parser.current.number);
    setEquation(parser.current.equation);
  }

  return (
    <View style={styles.container}>
      <Display number={number} equation={equation} />
      <ButtonPad onInput={pushToken} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    padding: 20,
  },
  numpad: {},
});
