import { StyleSheet } from "react-native";

export default StyleSheet.create({
  entry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 5,
    width: "95%",
    marginLeft: "2.5%", // ikke tænk
  },
  label: {
    fontSize: 18,
    color: "gray",
  },
  input: {
    marginLeft: "1%",
    width: "80%",
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
    textAlign: "left",
  },
  units: {
    fontSize: 18,
    color: "gray",
    marginLeft: 6,
  },
});
