import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View, DatePickerAndroid } from "react-native";
import { Button, Text } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useState } from "react";

interface VocEntry {
  french: string;
  pulaar: string;
}

interface Voc {
  title: string;
  entries: Array<VocEntry>;
}
type ExerciseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ExerciseScreen"
>;

const ExerciseScreen = ({ route, navigation }: ExerciseScreenProps) => {
  const [succeededEx, setSucceededEx] = useState<number>(0);
  const targetNbEx = route.params.voc.entries.length;
  const exercisesOrder = shuffle(route.params.voc.entries);
  const exercise =
    succeededEx < targetNbEx ? (
      <SimpleExercise
        voc={route.params.voc}
        wordIdx={succeededEx}
        onSuccess={() => setSucceededEx(succeededEx + 1)}
      />
    ) : null;

  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
      }}
    >
      {exercise ? exercise : <Text>Done! :)</Text>}
    </View>
  );
};

interface SimpleExerciseProps {
  voc: Voc;
  wordIdx: number;
  onSuccess: () => void;
}

function pickRandom<T>(array: T[]): T {
  if (array.length == 0) {
    throw new Error("Empty array");
  }
  return array[Math.floor(Math.random() * array.length)];
}

function pickNRandom<T>(
  array: T[],
  n: number,
  equals: (arg1: T, arg2: T) => boolean
): T[] {
  const picked: T[] = [];
  for (let index = 0; index < n; index++) {
    const candidates = array.filter((x) => !picked.find((y) => equals(x, y)));
    const randomWord = pickRandom(candidates);
    picked.push(randomWord);
  }
  return picked;
}

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const SimpleExercise = ({ voc, wordIdx, onSuccess }: SimpleExerciseProps) => {
  const target = voc.entries[wordIdx];
  const erroneous = pickNRandom(
    voc.entries.filter((x, i) => i != wordIdx),
    2,
    (w1, w2) => w1.pulaar == w2.pulaar
  );
  const candidates = shuffle([target, ...erroneous]);

  return (
    <View style={{ flexDirection: "column", backgroundColor: "#fff", flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Text h1 style={{ fontSize: 20, justifyContent: "center" }}>
          Veuillez traduire:
        </Text>
        <Text h1 style={{ fontSize: 20, fontWeight: "bold" }}>
          {target.pulaar}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
          data={candidates}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                paddingVertical: 10,
              }}
            >
              <Button
                title={item.french}
                onPress={() =>
                  item.pulaar == target.pulaar ? onSuccess() : null
                }
              />
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
  const vocs: Array<Voc> = Array<Voc>(5).fill({
    title: "family",
    entries: [
      {
        french: "papa",
        pulaar: "baba",
      },
      {
        french: "maman",
        pulaar: "nene",
      },
      {
        french: "oncle",
        pulaar: "kaaw",
      },
      {
        french: "tante",
        pulaar: "yaye",
      },
    ],
  });

  return (
    <View style={{ flexDirection: "column", backgroundColor: "#fff", flex: 1 }}>
      <Text style={{ marginLeft: 20, fontSize: 25 }}>
        Please select a topic to learn
      </Text>
      <View style={styles.container}>
        <FlatList
          data={vocs}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <Text
              style={styles.item}
              onPress={() => navigation.navigate("VocScreen", { voc: item })}
            >
              {item.title}
            </Text>
          )}
          horizontal={false}
          numColumns={2}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

type VocScreenProps = NativeStackScreenProps<RootStackParamList, "VocScreen">;
const VocScreen = ({ route, navigation }: VocScreenProps) => {
  const voc = route.params.voc;
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <Button
        title="Practice"
        onPress={() => navigation.navigate("ExerciseScreen", { voc: voc })}
      />
      <FlatList
        data={voc.entries}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, paddingLeft: 5 }}>
            <Text style={{ fontSize: 20 }}>{item.french}</Text>
            <Text style={{ fontSize: 18, color: "#1a6181" }}>
              {item.pulaar}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "#9b9b9b", height: 1 }} />
        )}
      ></FlatList>
    </View>
  );
};

type RootStackParamList = {
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

const styles = StyleSheet.create({
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
