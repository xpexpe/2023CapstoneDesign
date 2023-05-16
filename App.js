import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import HomeHeader from "./src/Components/HomeHeader";
import LoginScreen from "./src/Screen/LoginScreen";
import MainHome from "./src/Screen/MainHome";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false, // 상단에 흰색 바가 생기고 HOME이라는 글씨가 쓰여있는데 그거 안 보이게 하는 속성
          }}
        />
        <Stack.Screen
          name="Main_Home"
          component={MainHome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
