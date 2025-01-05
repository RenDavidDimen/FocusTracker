import { Pressable, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Colors from "@/constants/Colors";

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  color?: string;
  onPress: () => void;
};

export default function IconButton({
  icon,
  label,
  color: color,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: Colors.BLUE,
    marginTop: 12,
  },
});
