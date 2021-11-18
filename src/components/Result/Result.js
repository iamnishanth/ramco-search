import { memo } from "react";
import styles from "./Result.module.css";

const Result = ({ filteredData }) => {
  return (
    <ul className={styles.resultsContainer}>
      {filteredData &&
        filteredData.map((item) => (
          <li className={styles.resultItem} key={item.id || item._id}>
            <span>{item.name}</span>
            {item.rating && (
              <span>Accuracy: {Math.round(item.rating * 100) + "%"}</span>
            )}
          </li>
        ))}
    </ul>
  );
};

export default memo(Result);
