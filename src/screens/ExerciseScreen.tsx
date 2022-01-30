import { View } from "react-native";
import { Text } from "react-native-elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { SimpleExercise } from "../components/SimpleExercise";
import { RootStackParamList } from "../App";
import { shuffle } from "../util/util";

type ExerciseScreenProps = NativeStackScreenProps<
  RootStackParamList, "ExerciseScreen"
>;
export const ExerciseScreen = ({ route, navigation }: ExerciseScreenProps) => {
  const [succeededEx, setSucceededEx] = useState<number>(0);
  const targetNbEx = route.params.voc.entries.length;
  const exercisesOrder = shuffle(route.params.voc.entries);
  const exercise = succeededEx < targetNbEx ? (
    <SimpleExercise
      voc={route.params.voc}
      wordIdx={succeededEx}
      onSuccess={() => setSucceededEx(succeededEx + 1)} />
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
