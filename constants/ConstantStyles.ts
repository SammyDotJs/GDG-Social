import { StyleSheet } from "react-native";
import { SPACING, COLORS, FONT_SIZES, FONT_FAMILY } from "./index";
import { rMS, rS, rV } from "../utils";
export const CONSTANT_STYLES = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: rMS(SPACING.h4),
  },
  marginHorizontal: {
    marginHorizontal: rS(SPACING.h4),
  },
  flex: {
    alignItems: "center",
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
    alignItems: "center",
  },
  flexColumnStart: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
});
