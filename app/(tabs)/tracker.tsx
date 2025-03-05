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
import CircleButton from "@/components/CircleButton";
import StopWatch from "@/components/StopWatch";
import * as Colors from "@/constants/Colors";
import * as Keys from "@/constants/Keys";
import { Activity } from "@/classes/Activity";
import { TypeData } from "@/classes/TypeData";
import StorageHelper from "@/classes/StorageHelper";
import { TypeDataHelper } from "@/classes/TypeDataHelper";

export default function tracker() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [stopwatchAction, setStopwatchAction] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [localTypeData, setLocalTypeData] = useState<TypeData[]>([]);
  const [localActivityData, setLocalActivityData] = useState<Activity[]>([]);
  const stopWatchDataRef = useRef({ startTime: 0, elapsedTime: 0 });

  const fetchData = async () => {
    const typeData = await StorageHelper.getItem<TypeData[]>(Keys.TYPE_DATA);
    const activityData = await StorageHelper.getItem<Activity[]>(
      Keys.ACTIVITY_DATA
    );

    setLocalTypeData(typeData || []);
    setLocalActivityData(activityData || []);
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

    const newActivity = new Activity(
      activityName,
      activityType,
      startTime,
      elapsedTime
    );

    fetchData();

    setLocalTypeData(() => {
      const updatedTypeData = TypeDataHelper.updateTypeData(
        newActivity,
        localTypeData
      );
      (async () => {
        await StorageHelper.setItem<TypeData[]>(
          Keys.TYPE_DATA,
          updatedTypeData
        );
      })();
      return updatedTypeData;
    });

    setLocalActivityData(() => {
      const updatedData = [...localActivityData, newActivity];
      (async () => {
        await StorageHelper.setItem<Activity[]>(
          Keys.ACTIVITY_DATA,
          updatedData
        );
      })();
      return updatedData;
    });

    // Reset Stopwatch and input form
    setStopwatchAction("reset");
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

  useEffect(() => {
    fetchData();

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
