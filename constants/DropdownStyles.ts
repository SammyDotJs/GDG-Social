import { StyleSheet } from "react-native";
import { COLORS } from "./Colors";
import { rMS, rS } from "../utils";
import { FONT_SIZES } from "./FontSizes";
import { FONT_FAMILY } from "./FontFamily";
import { BORDER_RADIUS } from "./BorderRadius";
import { SPACING } from "./Spacing";

export const dropdownStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightOrange,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.b30,
    overflow: "hidden",
  },
  dropdown: {
    height: rS(40),
    borderRadius: BORDER_RADIUS.b40,
    paddingHorizontal: rS(SPACING.h10),
    backgroundColor: COLORS.darkBlue,
    width: "40%",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: rS(FONT_SIZES.h9),
    fontFamily: FONT_FAMILY.sb,
    color: COLORS.white,
  },
  selectedTextStyle: {
    fontSize: rS(FONT_SIZES.h8),
    fontFamily: FONT_FAMILY.sb,
    color: COLORS.white,
  },
  itemContainer: {
    backgroundColor: COLORS.lightOrange,
  },
  item: {
    paddingHorizontal: rS(SPACING.h10),
    backgroundColor: COLORS.lightOrange,
    paddingVertical: rS(SPACING.h11),
    marginVertical: rS(5),
  },
  textItem: {
    fontSize: rS(FONT_SIZES.h8),
    fontFamily: FONT_FAMILY.sb,
    color: COLORS.deepBlue,
  },
  selectedText: {
    backgroundColor: COLORS.deepBlue,
    borderRadius: BORDER_RADIUS.b40,
  },
  selectedTextItem: {
    color: COLORS.lightOrange,
  },
});
