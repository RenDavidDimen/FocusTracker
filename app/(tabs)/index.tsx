import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PieChart } from "react-native-gifted-charts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircleButton from "@/components/CircleButton";
import Divider from "@/components/Divider";
import * as Colors from "@/constants/Colors";
import * as Tests from "@/tests/TestData";
import { useEffect, useState } from "react";

export default function Index() {
  const [typeData, setTypeData] = useState([]);
  const [activityData, setActivityData] = useState([]);

  const fetchData = async () => {
    try {
      const typeData = await AsyncStorage.getItem("TYPE_DATA");
      const activityData = await AsyncStorage.getItem("ACTIVITY_DATA");
      if (typeData !== null) {
        setTypeData(JSON.parse(typeData));
      } else {
        setTypeData(JSON.parse("[]"));
      }
      if (activityData !== null) {
        setActivityData(JSON.parse(activityData));
      } else {
        setActivityData(JSON.parse("[]"));
      }
    } catch (e) {
      console.log(`Error fetching in data: ${e}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getDuration(duration: any) {
    const hours = Math.floor(((duration % 31536000) % 86400) / 3600);
    const minutes = Math.floor((((duration % 31536000) % 86400) % 3600) / 60);

    if (hours > 0) {
      return (
        <Text style={styles.activityDuration}>
          {hours}h {minutes}m
        </Text>
      );
    } else {
      return <Text style={styles.activityDuration}>{minutes}m</Text>;
    }
  }

  // const storeData = async (key: string, value) => {
  //   try {
  //     await AsyncStorage.setItem(key, value);
  //   } catch (e) {
  //     console.log(`saving error occured when trying to save ${key}`);
  //   }
  // };

  const renderActivityData = ({ item }) => {
    return (
      <View style={styles.activityContainer}>
        <Text style={styles.activityType}>{item.type} </Text>
        <Text style={styles.activityDuration}>
          {getDuration(item.duration)}
        </Text>
      </View>
    );
  };

  // storeData("TYPE_DATA", JSON.stringify(Tests.typeData));
  // storeData("ACTIVITY_DATA", JSON.stringify(Tests.activityData));

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
              data={typeData}
              centerLabelComponent={() => {
                return (
                  <View>
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                      3h41m
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={styles.recentActivitiesContainer}>
          <Text style={styles.subheader}>Recent Activities</Text>
          <FlatList data={activityData} renderItem={renderActivityData} />
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
  activityType: {
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
