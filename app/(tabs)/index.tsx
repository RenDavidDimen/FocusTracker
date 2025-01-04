import { Text, View, StyleSheet } from "react-native";
import * as Colors from "@/constants/Colors";

export default function Index() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Deep Work: Tracking Your Work</Text>
      <Text>Welcome Back, Name!</Text>
      <Text>Break Down</Text>
      <Text>
        Chart showing what kind of work has been done with total hours in the
        center
      </Text>
      <Text>Recent Activities</Text>
      <Text>Get Tracking Button</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    color: Colors.BLACK,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
});
