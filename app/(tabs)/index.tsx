import React from "react";
import { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PieChart } from "react-native-gifted-charts";
import CircleButton from "@/components/CircleButton";
import Divider from "@/components/Divider";
import TimeConverter from "@/classes/TimeConverter";
import * as Keys from "@/constants/Keys";
import * as Colors from "@/constants/Colors";
import { Activity } from "@/classes/Activity";
import { TypeData } from "@/classes/TypeData";
import StorageHelper from "@/classes/StorageHelper";

export default function Index() {
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
        <Text style={styles.header}>Welcome back,{"\n"}Ren!</Text>

        <View style={styles.breakDownContainer}>
          <Text style={styles.subheader}>Break Down</Text>
          <View style={styles.chart}>
            <PieChart
              donut
              showText
              radius={120}
              innerRadius={65}
              innerCircleColor={Colors.OFFWHITE}
              innerCircleBorderWidth={5}
              innerCircleBorderColor={Colors.BEIGE}
              edgesRadius={15}
              data={localTypeData}
              centerLabelComponent={() => {
                return (
                  <View>
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                      {TimeConverter.msToHM(
                        typeData.reduce(
                          (sum, type: TypeData) => sum + type.value,
                          0
                        )
                      )}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={styles.recentActivitiesContainer}>
          <Text style={styles.subheader}>Recent Activities</Text>
          <FlatList data={localActivityData} renderItem={renderActivityData} />
        </View>

        <Divider width={2} color={"lightgrey"} dividerStyle={styles.divider} />
        <View style={styles.recordActivityContainer}>
          <CircleButton
            icon="clock-plus-outline"
            diameter={100}
            backgroundColor={Colors.BLUE}
            onPress={() => alert("Going to tracking screen")}
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
  title: {
    color: Colors.BLACK,
    fontWeight: "bold",
    fontSize: 32,
  },
  header: {
    color: Colors.BLACK,
    fontSize: 48,
    paddingVertical: 5,
  },
  subheader: {
    color: Colors.BLACK,
    fontSize: 32,
    paddingVertical: 5,
  },
  breakDownContainer: {},
  chart: {
    alignItems: "center",
    padding: 10,
  },
  recentActivitiesContainer: {
    maxHeight: 130,
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
  recordActivityContainer: {
    padding: 10,
    alignItems: "center",
  },
  newActivityLabel: {
    fontSize: 18,
    fontWeight: 400,
  },
  divider: {
    marginTop: 10,
    borderRadius: 1,
    borderBottomColor: Colors.OFFWHITE,
    borderBottomWidth: 1,
  },
});
