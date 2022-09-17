import React, { useReducer, useState } from "react";

export const FavoriteContext = React.createContext();

const favoriteListReducer = (state, actions) => {
  switch (actions.type) {
    case "add_to_favorites":
      return [...state, { ...actions.payload }];
    case "remove_from_favorites":
      return state.filter((movie) => movie.id !== actions.payload);
    default:
      return state;
  }
};

export const FavoriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteListReducer, []);
  const [affectedMovie, setAffectedMovie] = useState({
    id: "",
    actionType: "",
  });

  const addToFavorites = ({ id, title, posterUri }) => {
    dispatch({ type: "add_to_favorites", payload: { id, title, posterUri } });
    setAffectedMovie({ id, actionType: "addToFavorites" });
  };

  const removeFromFavorites = (id) => {
    dispatch({ type: "remove_from_favorites", payload: id });
    setAffectedMovie({ id, actionType: "removeFromFavorites" });
  };

  const hasMovie = (id) => {
    const movie = state.find((movie) => movie.id === id);
    return !!movie;
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteMovies: state,
        favoriteMoviesLength: state.length,
        affectedMovie,
        addToFavorites,
        removeFromFavorites,
        hasMovie,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
