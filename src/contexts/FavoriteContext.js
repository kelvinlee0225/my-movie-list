import React, { useReducer } from "react";

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

  const addToFavorites = ({ id, title, posterUri }) => {
    dispatch({ type: "add_to_favorites", payload: { id, title, posterUri } });
  };

  const removeFromFavorites = (id) => {
    dispatch({ type: "remove_from_favorites", payload: id });
  };

  const hasMovie = (id) => {
    const movie = state.find((movie) => movie.id === id);
    return !!movie;
  };
  //   const favoriteMovies = new Map();

  return (
    <FavoriteContext.Provider
      value={{
        favoriteMovies: state,
        addToFavorites,
        removeFromFavorites,
        hasMovie,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
