import { StyleSheet, DatePickerAndroid } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { HomeScreen } from "./screens/HomeScreen";
import { VocScreen } from "./screens/VocScreen";
import { ExerciseScreen } from "./screens/ExerciseScreen";
import { Voc } from "./types";


export type RootStackParamList = {
  Home: undefined;
  VocScreen: { voc: Voc };
  ExerciseScreen: { voc: Voc };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Learn Pulaar" }}
        />
        <Stack.Screen
          name="VocScreen"
          component={VocScreen}
          options={{ title: "Vocabulaire" }}
        />
        <Stack.Screen
          name="ExerciseScreen"
          component={ExerciseScreen}
          options={{ title: "Exercice" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 30,
    fontSize: 20,
  },
});

registerRootComponent(App);
