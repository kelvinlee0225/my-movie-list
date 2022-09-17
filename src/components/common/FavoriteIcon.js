import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { RenderIf } from "./RenderIf";
import { FavoriteContext } from "../../contexts";

export const FavoriteIcon = ({
  movieId,
  movieTitle,
  moviePoster,
  favoriteIconStyle,
  ...props
}) => {
  const {
    addToFavorites,
    removeFromFavorites,
    hasMovie,
    favoriteMoviesLength,
    affectedMovie,
  } = useContext(FavoriteContext);
  const [pressed, setPressed] = useState(hasMovie(movieId));

  useEffect(() => {
    if (affectedMovie.id === movieId) {
      if (affectedMovie.actionType === "addToFavorites") setPressed(true);
      else setPressed(false);
    }
  }, [favoriteMoviesLength]);

  return (
    <TouchableOpacity
      {...props}
      onPress={() => {
        if (hasMovie(movieId)) {
          removeFromFavorites(movieId);
        } else {
          addToFavorites({
            id: movieId,
            title: movieTitle,
            posterUri: moviePoster,
          });
        }
      }}
    >
      <RenderIf
        condition={pressed}
        otherwise={
          <MaterialIcons
            name="favorite-border"
            size={24}
            color="black"
            style={favoriteIconStyle}
          />
        }
      >
        <MaterialIcons
          name="favorite"
          size={24}
          color="red"
          style={favoriteIconStyle}
        />
      </RenderIf>
    </TouchableOpacity>
  );
};
