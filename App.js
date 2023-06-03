import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import KakaoLogin from './src/Components/KakaoLogin';
import LoginPage from './src/Screen/LoginPage';
import Main from './src/Screen/Main';
import AIPage from './src/Screen/AIPage';
import TextPage from './src/Screen/TextPage';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // 폰트 불러오는 작업 실행 , 실행 완료시 스플래시 스크린 종료
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'SUITE-Light': require('./assets/fonts/SUITE-Light.otf'),
          'SUITE-Medium': require('./assets/fonts/SUITE-Medium.otf'),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      console.log('[App.js] prepare is OK');
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: false, // 상단에 흰색 바가 생기고 HOME이라는 글씨가 쓰여있는데 그거 안 보이게 하는 속성
          }}
        />
        <Stack.Screen
          name="Main_Home"
          component={Main}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AI"
          component={AIPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TextInput"
          component={TextPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KakaoLogin"
          component={KakaoLogin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
