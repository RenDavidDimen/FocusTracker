import { Activity } from "@/classes/Activity";
import { TypeData } from "@/classes/TypeData";
import * as Colors from "@/constants/Colors";

export const activityData = [
  new Activity("Coding Linya", "Coding", 1736031903, 2400000),
  new Activity("Reading The Challenger Sale", "Reading", 1714409503, 3661000),
  new Activity("Coding Focus Tracker", "Coding", 1704409503, 7200000),
];

export const typeData = [
  new TypeData("Coding", 2400000, Colors.GREEN),
  new TypeData("Second Item", 3661000, Colors.BLUE),
  new TypeData("Third Item", 7200000, Colors.PINK),
];
