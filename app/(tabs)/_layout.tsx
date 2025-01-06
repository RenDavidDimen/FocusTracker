import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Colors from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.BEIGE,
        },
        headerShadowVisible: false,
        headerTintColor: Colors.BLACK,
        tabBarActiveBackgroundColor: Colors.LIGHTGREEN,
        tabBarActiveTintColor: Colors.BLACK,
        tabBarStyle: {
          backgroundColor: Colors.BEIGE,
          height: 75,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "timer-sharp" : "timer-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitle: "Settings",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings-sharp" : "settings-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen name="+not-found" options={{}} />
    </Tabs>
  );
}
