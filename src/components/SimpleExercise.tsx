import { FlatList, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Voc } from "../types";
import { pickNRandom, shuffle } from "../util/util";

interface SimpleExerciseProps {
  voc: Voc;
  wordIdx: number;
  onSuccess: () => void;
}

export const SimpleExercise = ({
  voc,
  wordIdx,
  onSuccess,
}: SimpleExerciseProps) => {
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
