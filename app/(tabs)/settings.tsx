import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Colors from "@/constants/Colors";

export default function Settings() {
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.settingsContainer}>
        <Text style={styles.settingsButton}>Profile</Text>
        <Text style={styles.settingsButton}>UI</Text>
        <Text style={styles.settingsButton}>Export Data</Text>
      </ScrollView>
    </View>
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
});
