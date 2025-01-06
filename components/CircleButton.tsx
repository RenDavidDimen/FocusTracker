import { View, Pressable, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Colors from "@/constants/Colors";

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  diameter: number;
  iconColor?: string;
  backgroundColor?: string;
  onPress: () => void;
};

export default function CircleButton({
  onPress,
  icon,
  iconColor: iconColor,
  backgroundColor: backgroundColor,
  diameter,
}: Props) {
  return (
    <View
      style={[
        styles.circleButtonContainer,
        { width: diameter, height: diameter },
      ]}
    >
      <Pressable
        style={[styles.circleButton, { backgroundColor: backgroundColor }]}
        onPress={onPress}
      >
        <MaterialCommunityIcons name={icon} size={38} color={iconColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: Colors.BLUE,
  },
});
