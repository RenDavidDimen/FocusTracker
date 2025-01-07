import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Colors from "@/constants/Colors";

export default function StopWatch({ action }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef<Timer>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (action === "start") {
      start();
    } else if (action === "stop") {
      stop();
    } else if (action === "reset") {
      reset();
    }
  }, [action]);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  // ******** Stopwatch Functions ********
  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setTimeout(() => {
      setElapsedTime(0);
    }, 1);
  }

  function formatTime() {
    let hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(
      2,
      "0"
    );
    let minutes = String(Math.floor((elapsedTime / (1000 * 60)) % 60)).padStart(
      2,
      "0"
    );
    let seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(
      2,
      "0"
    );

    if (hours === "00") {
      return `${minutes}m${seconds}s`;
    } else {
      return `${hours}h${minutes}m${seconds}s`;
    }
  }

  return (
    <View style={styles.timerComponent}>
      <Text style={styles.display}>{formatTime()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerComponent: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 150,
    borderWidth: 15,
    borderColor: Colors.OFFWHITE,
    height: 300,
    width: 300,
  },
  display: {
    color: Colors.BLACK,
    fontSize: 48,
    paddingVertical: 5,
  },
});
