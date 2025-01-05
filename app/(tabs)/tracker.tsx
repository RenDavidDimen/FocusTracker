import { StyleSheet, Text, View } from "react-native";
import * as Colors from "@/constants/Colors";

export default function tracker() {
  return (
    <View style={styles.screen}>
      <Text>Track Your Activity</Text>
      <Text>00:00:00</Text>
      <Text>Start</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.OFFWHITE,
  },
});
