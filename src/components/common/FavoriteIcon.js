import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { RenderIf } from "../RenderIf";

export const FavoriteIcon = (props) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity {...props} onPress={() => setPressed(!pressed)}>
      <RenderIf condition={!pressed}>
        <MaterialIcons name="favorite-border" size={24} color="black" />
      </RenderIf>

      <RenderIf condition={!!pressed}>
        <MaterialIcons name="favorite" size={24} color="red" />
      </RenderIf>
    </TouchableOpacity>
  );
};
