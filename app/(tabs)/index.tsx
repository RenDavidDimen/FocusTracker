import { Text, View, StyleSheet } from "react-native";
import CircleButton from "@/components/CircleButton";
import Divider from "@/components/Divider";
import * as Colors from "@/constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import { PieChart } from "react-native-gifted-charts";

const activityData = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    type: "First Item",
    date: 1736031903,
    duration: 2400,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    type: "Second Item",
    date: 1714409503,
    duration: 3661,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    type: "Third Item",
    date: 1704409503,
    duration: 7200,
  },
];

const timeTotals = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    type: "First Item",
    date: 1736031903,
    value: 2400,
    color: Colors.LIGHTGREEN,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    type: "Second Item",
    date: 1714409503,
    value: 3661,
    color: Colors.BLUE,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    type: "Third Item",
    date: 1704409503,
    value: 7200,
    color: Colors.PINK,
  },
];

export default function Index() {
  function getDuration(duration) {
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

  const renderItem = ({ item }) => {
    return (
      <View style={styles.activityContainer}>
        <Text style={styles.activityType}>{item.type} </Text>
        <Text style={styles.activityDuration}>
          {getDuration(item.duration)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
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
              data={timeTotals}
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
          <FlatList
            data={activityData}
            renderItem={renderItem}
            onRefresh={() => console.log("refreshing")}
          />
        </View>

        <Divider width={2} color={"lightgrey"} dividerStyle={styles.divider} />
        <View style={styles.recordActivityContainer}>
          <CircleButton
            icon="clock-plus-outline"
            onPress={() => alert("Going to tracking screen")}
          />
          <Text style={styles.newActivityLabel}>Record New Activity</Text>
        </View>
      </View>
    </View>
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
  divider: {
    marginTop: 10,
    borderRadius: 1,
    borderBottomColor: Colors.OFFWHITE,
    borderBottomWidth: 1,
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
});
