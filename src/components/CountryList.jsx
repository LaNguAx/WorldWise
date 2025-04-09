import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import PropTypes from "prop-types";
import Message from "./Message";

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city in the map."}
      />
    );

  const countries = Array.from(
    cities
      .reduce(
        (acc, city) =>
          acc.set(city.country, { country: city.country, emoji: city.emoji }),
        new Map()
      )
      .values()
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
