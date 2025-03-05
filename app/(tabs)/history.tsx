import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Colors from "@/constants/Colors";
import CalendarHeatmap from "react-calendar-heatmap";
import { TypeData } from "@/classes/TypeData";
import { Activity } from "@/classes/Activity";
import StorageHelper from "@/classes/StorageHelper";
import * as Keys from "@/constants/Keys";
import { useFocusEffect } from "expo-router";
import React from "react";
import TimeConverter from "@/classes/TimeConverter";

export default function History() {
  const [localTypeData, setLocalTypeData] = useState<TypeData[]>([]);
  const [localActivityData, setLocalActivityData] = useState<Activity[]>([]);

  const fetchData = async () => {
    const typeData = await StorageHelper.getItem<TypeData[]>(Keys.TYPE_DATA);
    const activityData = await StorageHelper.getItem<Activity[]>(
      Keys.ACTIVITY_DATA
    );

    setLocalTypeData(typeData || []);
    setLocalActivityData(activityData || []);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const today = new Date();

  const randomValues = getRange(200).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 5),
    };
  });

  function shiftDate(date: Date, numDays: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count: number) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomValues.forEach((value) =>
    console.log(`date: ${value.date}, count: ${value.count}\n`)
  );

  function getDuration(duration: any) {
    const timeString = TimeConverter.msToDHMS(duration);
    return <Text style={styles.activityDuration}>{timeString}</Text>;
  }

  const renderActivityData = ({ item }: { item: Activity }) => {
    return (
      <View style={styles.activityContainer}>
        <Text style={styles.activityName}>{item.name} </Text>
        <Text style={styles.activityDuration}>
          {getDuration(item.duration)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screenContainer}>
        <Text style={styles.subHeader}>History</Text>
        <View>
          <Text style={styles.sectionTitle}>Calendar</Text>

          <CalendarHeatmap
            startDate={shiftDate(today, -150)}
            endDate={today}
            values={randomValues}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-github-${value.count}`;
            }}
            showWeekdayLabels={true}
          />
        </View>

        <View>
          <Text style={styles.sectionTitle}>Activity</Text>
          <FlatList data={localActivityData} renderItem={renderActivityData} />
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
  },
  subHeader: {
    color: Colors.BLACK,
    fontSize: 32,
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    paddingVertical: 10,
  },
  activityContainer: {
    backgroundColor: Colors.WHITE,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  activityName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  activityDuration: {
    fontSize: 18,
  },
});
