import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FavouritesContext = createContext();

// Favourites reducer
const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVOURITES':
      const existingFavourite = state.favourites.find(item => item.id === action.payload.id);
      if (existingFavourite) {
        return state; // Already in favourites
      }
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    
    case 'REMOVE_FROM_FAVOURITES':
      return {
        ...state,
        favourites: state.favourites.filter(item => item.id !== action.payload)
      };
    
    case 'CLEAR_FAVOURITES':
      return {
        ...state,
        favourites: []
      };
    
    default:
      return state;
  }
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouritesReducer, {
    favourites: []
  });

  const addToFavourites = (product) => {
    dispatch({ type: 'ADD_TO_FAVOURITES', payload: product });
  };

  const removeFromFavourites = (id) => {
    dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: id });
  };

  const clearFavourites = () => {
    dispatch({ type: 'CLEAR_FAVOURITES' });
  };

  const isInFavourites = (id) => {
    return state.favourites.some(item => item.id === id);
  };

  const totalFavourites = state.favourites.length;

  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (savedFavourites) {
      savedFavourites.forEach(item => {
        dispatch({ type: 'ADD_TO_FAVOURITES', payload: item });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state.favourites));
  }, [state.favourites]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites: state.favourites,
        addToFavourites,
        removeFromFavourites,
        clearFavourites,
        isInFavourites,
        totalFavourites
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};


