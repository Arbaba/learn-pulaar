import { StatusBar } from "expo-status-bar";
import { FlatList, View } from "react-native";
import { Text } from "react-native-elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, styles } from "../App";
import { Voc } from "../types";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
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
