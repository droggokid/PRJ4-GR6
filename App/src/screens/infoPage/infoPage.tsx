import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, ScrollView, Alert } from "react-native";
import style from "../../styles/infoStyle";
import { Dropdown } from "react-native-element-dropdown";
import TextField from "../../components/TextField";
import Btn from "../../components/Btn";
import { textStyles } from "../../styles/textStyles";
import Server from "../../models/Server";
import { currentUser } from "../../models/User";

export default function InfoPage() {
  const [isEditing, setIsEditing] = useState(false); // edit stuff
  const [height, setHeight] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("------");
  const [username, setUsername] = useState("");

  const allGenders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  // just mock data
  const profilePicture =
    "https://hips.hearstapps.com/hmg-prod/images/albert-einstein-sticks-out-his-tongue-when-asked-by-news-photo-1681316749.jpg";

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await Server.getUserInfo();
          currentUser.update(userData);
          setHeight(userData.height || 0);
          setCurrentWeight(userData.currentWeight || 0);
          setAge(userData.age || 0);
          setGender((userData.gender && userData.gender.toLocaleLowerCase()) || "------");
          setUsername(currentUser.fullName);
        } catch (error) {
          console.error("fetch failed: ", error);
        }
      };
  
      fetchUser();
    }, []);

  const handleSavePress = async () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      await Server.putInfoPage(height, gender, currentWeight, age);
    }
  };

  const findGoal = () => {
    if (currentWeight > currentUser.targetWeight) {
      return "Losing Weight";
    } else if (currentWeight < currentUser.targetWeight) {
      return "Gaining Weight";
    } else {
      return "Maintaining Weight";
    }
  };

  const renderGenderDropdown = () => (
    <View>
      <Dropdown
        style={[style.dropdown]}
        placeholderStyle={style.placeholderText}
        selectedTextStyle={[style.placeholderText, { color: isEditing ? "black" : "grey" }, {fontWeight: isEditing ? "bold" : "normal"}]}
        data={allGenders}
        labelField="label"
        valueField="value"
        placeholder={!isEditing ? "Select Gender" : "--------"}
        value={gender}
        onChange={(item) => setGender(item.value)}
        disable={!isEditing}
      />
    </View>
  );

  return (
    <ScrollView style={style.container}>
      <Image source={{ uri: profilePicture }} style={style.profilePic} />
      <Text style={textStyles.userName}>{username}</Text> 
      <Text style={textStyles.goalType}>Goal: {findGoal()}</Text>

      <TextField
        label="Height"
        value={(height || '').toString()}
        setValue={setHeight}
        units="cm"
        isEditing={isEditing}
      />
      <TextField
        label="Current Weight"
        value={(currentWeight || '').toString()}
        setValue={setCurrentWeight}
        units="kg"
        isEditing={isEditing}
      />
      <TextField
        label="Age"
        value={(age || '').toString()}
        setValue={setAge}
        units="years"
        isEditing={isEditing}
      />
      {renderGenderDropdown()}
      <View style={[{ alignItems: "center" }]}>
        <Btn
          text={isEditing ? "Save" : "Edit Profile"}
          onClick={handleSavePress}
          style={style.button}
        />
      </View>
    </ScrollView>
  );
}
