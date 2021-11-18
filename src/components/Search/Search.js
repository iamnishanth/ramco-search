import { useState } from "react";
import Result from "../Result/Result";
import { unsortedData } from "../../data";
import { findBestMatch } from "../../utils/similarity";

import styles from "./Search.module.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(unsortedData);
  const [timeTaken, setTimeTaken] = useState(null);

  const onSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSearch = () => {
    const startTime = performance.now();
    // fallback if search query is a single character
    if (searchQuery.length <= 1) {
      const result = unsortedData.filter((item) =>
        item.name.includes(searchQuery.trim())
      );
      setFilteredData(result);
    } else {
      // actual comparison
      let result = findBestMatch(searchQuery.trim(), unsortedData);
      result = result.filter((item) => item.rating !== 0);
      setFilteredData(result);
    }
    const endTime = performance.now();
    setTimeTaken((endTime - startTime) / 100);
  };

  return (
    <section className={styles.search}>
      <div className={styles.inputArea}>
        <div className={styles.searchWrapper}>
          <h1 className={styles.searchTitle}>Search for Name</h1>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search Name"
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
          <button className={styles.searchBtn} onClick={onSearch}>
            Search
          </button>
          {timeTaken && (
            <p className={styles.subtitle}>
              Found {filteredData.length} records in {timeTaken.toFixed(2)}s
            </p>
          )}
        </div>
      </div>
      <Result filteredData={filteredData} />
    </section>
  );
};

export default Search;
