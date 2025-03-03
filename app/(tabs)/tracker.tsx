import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircleButton from "@/components/CircleButton";
import StopWatch from "@/components/StopWatch";
import * as Colors from "@/constants/Colors";
import * as Keys from "@/constants/Keys";
import { Activity } from "@/classes/Activity";
import { activityData } from "@/tests/TestData";

export default function tracker() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [stopwatchAction, setStopwatchAction] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [typeData, setTypeData] = useState([]);
  const [localActivityData, setLocalActivityData] = useState<Activity[]>([]);
  const stopWatchDataRef = useRef({ startTime: 0, elapsedTime: 0 });

  const fetchData = async () => {
    try {
      const typeData = await AsyncStorage.getItem(Keys.TYPE_DATA);
      const activityData = await AsyncStorage.getItem(Keys.ACTIVITY_DATA);
      if (typeData !== null) {
        setTypeData(JSON.parse(typeData));
      } else {
        setTypeData([]);
      }
      if (activityData !== null) {
        setLocalActivityData(JSON.parse(activityData));
        console.log(
          `fetched: ${JSON.stringify(JSON.parse(activityData), null, 4)}`
        );
      } else {
        setLocalActivityData([]);
      }
    } catch (e) {
      console.log(`Error fetching in data: ${e}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const storeActivityData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      await fetchData();
    } catch (e) {
      console.log(`saving error occured when trying to save ${key}`);
    }
  };

  const handleSave = () => {
    setStopwatchAction("stop");

    if (activityName.trim() === "" || activityType.trim() === "") {
      alert("'Error', 'Please fill in both fields.'");
      return;
    }

    const { startTime, elapsedTime } = stopWatchDataRef.current;
    if (startTime == 0 || elapsedTime == 0) {
      alert(
        "Error: Invalid Stopwatch Data, Start Time or Elapsed Time read as 0"
      );
      return;
    }

    // *************************************************
    const newActivity = new Activity(
      activityName,
      activityType,
      startTime,
      elapsedTime
    );

    setLocalActivityData((activityData) => {
      const updatedData = [...activityData, newActivity];
      storeActivityData(Keys.ACTIVITY_DATA, JSON.stringify(updatedData));
      return updatedData;
    });

    // *************************************************

    setStopwatchAction("reset");

    // Clear form
    setActivityName("");
    setActivityType("");
  };

  function playButton() {
    if (stopwatchAction !== "start") {
      return (
        <CircleButton
          icon="play"
          diameter={100}
          backgroundColor={Colors.BLUE}
          onPress={() => setStopwatchAction("start")}
        />
      );
    } else {
      return (
        <CircleButton
          icon="pause"
          diameter={100}
          backgroundColor={Colors.BLUE}
          onPress={() => setStopwatchAction("stop")}
        />
      );
    }
  }

  function setStopwatchControls() {
    if (stopwatchAction === "reset" || stopwatchAction === "") {
      return (
        <View style={styles.timerControls}>
          <CircleButton
            icon="refresh"
            diameter={80}
            backgroundColor="lightgrey"
            onPress={() => {}}
          />
          {playButton()}
          <CircleButton
            icon="content-save-outline"
            diameter={80}
            backgroundColor="lightgrey"
            onPress={() => {}}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.timerControls}>
          <CircleButton
            icon="refresh"
            diameter={80}
            backgroundColor={Colors.PINK}
            onPress={() => setStopwatchAction("reset")}
          />
          {playButton()}
          <CircleButton
            icon="content-save-outline"
            diameter={80}
            backgroundColor={Colors.PURPLE}
            onPress={handleSave}
          />
        </View>
      );
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screenContainer}>
        <View style={styles.upperScreenSection}>
          <Text style={styles.subHeader}>Track Your Activity</Text>

          <View style={styles.timerContainer}>
            <StopWatch action={stopwatchAction} dataRef={stopWatchDataRef} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.activityForm}
          >
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
          </KeyboardAvoidingView>
        </View>

        {!isKeyboardVisible && setStopwatchControls()}
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
  upperScreenSection: {
    flex: 6 / 7,
    justifyContent: "space-between",
  },
  subHeader: {
    color: Colors.BLACK,
    fontSize: 32,
    paddingVertical: 5,
  },
  timerContainer: {
    alignItems: "center",
    paddingVertical: 5,
    marginVertical: 10,
  },
  activityForm: {
    paddingVertical: 10,
    justifyContent: "center",
  },
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
