import { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import CircleButton from "@/components/CircleButton";
import * as Colors from "@/constants/Colors";

export default function tracker() {
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [savedData, setSavedData] = useState([]);

  const handleSave = () => {
    if (activityName.trim() === "" || activityType.trim() === "") {
      alert("'Error', 'Please fill in both fields.'");
      return;
    }

    const newActivity = { name: activityName, type: activityType };
    setSavedData((prevData) => [...prevData, newActivity]);

    alert("[" + activityName + ", " + activityType + "] saved successfully!'");

    // Clear the form
    setActivityName("");
    setActivityType("");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screenContainer}>
        <Text style={styles.subHeader}>Track Your Activity</Text>

        <View style={styles.timerContainer}>
          <View style={styles.timerComponent}>
            <Text style={styles.timer}>00:00:00</Text>
          </View>
        </View>

        <View style={styles.activityForm}>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Activity Name </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter activity name"
              value={activityName}
              onChangeText={setActivityName}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Activity Type </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter activity type"
              value={activityType}
              onChangeText={setActivityType}
            />
          </View>
        </View>

        <View style={styles.timerControls}>
          <CircleButton
            icon="refresh"
            diameter={80}
            backgroundColor={Colors.PINK}
            onPress={() => alert("Going to tracking screen")}
          />
          <CircleButton
            icon="clock-plus-outline"
            diameter={100}
            onPress={() => alert("Going to tracking screen")}
          />
          <CircleButton
            icon="content-save-outline"
            diameter={80}
            backgroundColor={Colors.PURPLE}
            onPress={handleSave}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.BEIGE,
    paddingTop: 50,
    paddingBottom: 10,
  },
  screenContainer: {
    flex: 1,
    width: "90%",
    maxWidth: 400,
    justifyContent: "space-between",
  },
  subHeader: {
    color: Colors.BLACK,
    fontSize: 32,
    paddingVertical: 5,
  },
  timerContainer: {
    alignItems: "center",
  },
  timerComponent: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 150,
    borderWidth: 15,
    borderColor: Colors.OFFWHITE,
    height: 300,
    width: 300,
  },
  timer: {
    color: Colors.BLACK,
    fontSize: 48,
    paddingVertical: 5,
  },
  activityForm: {},
  inputField: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  inputLabel: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    padding: 8,
    marginBottom: 10,
    fontSize: 18,
    color: Colors.BLACK,
    borderRadius: 10,
    backgroundColor: Colors.OFFWHITE,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  timerControls: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
