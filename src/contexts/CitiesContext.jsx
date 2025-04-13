import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import PropTypes from "prop-types";
const URL = "http://localhost:8000";

const CitiesContext = createContext();

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        const fixedData = data.map((city) => {
          return {
            ...city,
            id: city.id,
          };
        });

        dispatch({ type: "cities/loaded", payload: fixedData });
      } catch (error) {
        // alert(`There was an error fetching the cities`);
        dispatch({ type: "rejected", payload: error.message });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id) => {
      // console.log(id, currentCity.id);
      if (id === currentCity.id) return;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${URL}/cities/${id}`);
        const data = await res.json();

        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        alert(`There was an error fetching city with id ${id}`);
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
      // setCities((prevCities) => [...prevCities, data]);
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete city");
      }

      dispatch({ type: "city/deleted", payload: id });
      // setCities((prevCities) => prevCities.filter((city) => city.id !== id));
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
