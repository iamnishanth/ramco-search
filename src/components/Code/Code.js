import { unsortedData } from "../../data";

import styles from "./Code.module.css";

// component to display data as JSON
const Code = () => {
  return (
    <section className={styles.code}>
      <h1 className={styles.codeTitle}>User Collection as JSON</h1>
      <p className={styles.codeTitle}>{unsortedData.length} records</p>
      <pre>
        <code>{JSON.stringify(unsortedData, null, 2)}</code>
      </pre>
    </section>
  );
};

export default Code;
