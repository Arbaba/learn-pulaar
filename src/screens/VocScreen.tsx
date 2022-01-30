import { FlatList, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type VocScreenProps = NativeStackScreenProps<RootStackParamList, "VocScreen">;
export const VocScreen = ({ route, navigation }: VocScreenProps) => {
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
        onPress={() => navigation.navigate("ExerciseScreen", { voc: voc })} />
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
