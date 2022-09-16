import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { RenderIf } from "../RenderIf";
import { FavoriteContext } from "../../contexts";

export const FavoriteIcon = ({
  movieId,
  movieTitle,
  moviePoster,
  ...props
}) => {
  const { addToFavorites, removeFromFavorites, hasMovie } =
    useContext(FavoriteContext);
  const [pressed, setPressed] = useState(hasMovie(movieId));

  return (
    <TouchableOpacity
      {...props}
      onPress={() => {
        if (hasMovie(movieId)) {
          removeFromFavorites(movieId);
          setPressed(false);
        } else {
          addToFavorites({
            id: movieId,
            title: movieTitle,
            posterUri: moviePoster,
          });
          setPressed(true);
        }
      }}
    >
      <RenderIf
        condition={pressed}
        otherwise={
          <MaterialIcons name="favorite-border" size={24} color="black" />
        }
      >
        <MaterialIcons name="favorite" size={24} color="red" />
      </RenderIf>
    </TouchableOpacity>
  );
};
