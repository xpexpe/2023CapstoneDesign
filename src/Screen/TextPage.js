import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  View,
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
  Keyboard,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import callGoogleVisionAsync from "../Components/OcrFunction";

function TextPage({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  const [textData, setTextData] = useState("");
  const onChangeText = (payload) => setTextData(payload);
  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "SUITE-Light": require("../../assets/fonts/SUITE-Light.otf"),
      "SUITE-Medium": require("../../assets/fonts/SUITE-Medium.otf"),
    });
    setIsReady(true);
  };

  useEffect(() => {
    loadFonts();
    fetchData();
  }, []);

  const fetchData = async () => {
    if (otherParam != "") {
      setTextData("Loading ... ");
      const responseData = await callGoogleVisionAsync(otherParam);
      setTextData(responseData.text);
      console.log(responseData.text);
    }
  };

  if (isReady && textData != "") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#DCE2F0" }}>
        <KeyboardAvoidingView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          behavior="padding"
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              width: "100%",
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
              color: "#50586C",
            }}
            activeOpacity={1}
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontFamily: "SUITE-Medium",
              }}
            >
              이미지로 문제를 구성했어요
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "SUITE-Light",
                marginTop: 10,
              }}
            >
              아래 변환된 문제에 오탈자가 없는지 검수한 후
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "SUITE-Light",
              }}
            >
              나인에게 물어보기 버튼을 눌러주세요
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              borderRadius: 30,
              backgroundColor: "#F0EDCC",
              width: "96%",
              padding: 10,
              paddingTop: 25,
              marginBottom: 30,
            }}
          >
            <ScrollView style={{}}>
              <TextInput
                onChangeText={onChangeText}
                returnKeyType="done"
                value={textData}
                multiline={true}
                placeholder="문제를 입력해주세요."
                color="#02343F"
              />
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={1}
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: pressed ? "#3f3f3f" : "black", // 클릭 시 배경색 변경
                },
              ]}
            >
              <Text style={styles.text}>나인에게 물어보기</Text>
            </Pressable>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "SUITE-Medium",
  },
});

export default TextPage;
