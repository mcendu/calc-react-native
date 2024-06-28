import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
    display: {
        flex: 1,
        width: "100%",
    },
    equation: {
        fontSize: 16,
        textAlign: "right",
    },
    number: {
        fontSize: 72,
        textAlign: "right",
    },
});

export default function Display(props) {
    return <View style={styles.display}>
        <Text style={styles.equation}>{props.equation}</Text>
        <Text style={styles.number}>{props.number}</Text>
    </View>
}

