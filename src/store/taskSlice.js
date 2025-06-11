import { createSlice, nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const onNotify = () => toast("Delete Movie");

const initialState = {
  tasks: [],
  showOnlyFavorites: false,
};

export const tasksSlice = createSlice({
  name: "TaskList",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { movie, urlmovie } = action.payload;

      const movieData = {
        id: nanoid(),
        movieName: movie,
        urlmovie: urlmovie,
        isFavorite: false,
      };
      state.movies.push(movieData);
    },
    removeTask: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      onNotify();
    },
    favoriteTask: (state, action) => {
      const movie = state.movies.find(
        (movie) => movie.id === action.payload.id
      );
      if (movie) movie.isFavorite = !movie.isFavorite;
    },
    toggleshowsPending: (state) => {
      state.showOnlyFavorites = !state.showOnlyFavorites;
    },

    editTask: (state, action) => {
      const { id, movieName, urlmovie } = action.payload;
      const movieToEdit = state.movies.find((movie) => movie.id === id);
      if (movieToEdit) {
        movieToEdit.movieName = movieName;
        movieToEdit.urlmovie = urlmovie;
      }
    },
  },
});

export const {
  addTask,
  removeTask,
  favoriteTask,
  toggleshowsPending,
  editTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
