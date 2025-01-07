import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Colors from "@/constants/Colors";

export default function History() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.settingsButton}>Calendar</Text>
      <Text style={styles.settingsButton}>History</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  settingsContainer: {
    padding: 10,
  },
  settingsButton: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  subheader: {
    color: Colors.BLACK,
    fontSize: 32,
    paddingVertical: 5,
  },
});
