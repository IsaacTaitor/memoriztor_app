import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import "./styles.css";
import verbs from "./verbs.json";

enum TYPE_OF_VERB {
  "INFINITIVE" = "infinitive",
  "GERUND" = "gerund",
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const [index, setIndex] = useState<number>(0);

  const [currectStackIndex, setCurrectStackIndex] = useState<number>([]);

  const update = useCallback(() => {
    setIndex(getRandomInt(verbs.length));
  }, []);

  useEffect(() => {
    update();
  }, [update]);

  const handleClick = (type: TYPE_OF_VERB) => {
    if (verbs[index].type === type) {
      enqueueSnackbar("Правильно :)", { variant: "success" });
    } else {
      enqueueSnackbar("Неправильно :(", { variant: "error" });
    }
    update();
  };

  return (
    <>
      <h1>Memorizator</h1>
      <h4>{verbs[index].value}</h4>
      <div className="card">
        <button onClick={() => handleClick(TYPE_OF_VERB.INFINITIVE)}>Infinitive</button>
        <button onClick={() => handleClick(TYPE_OF_VERB.GERUND)}>Gerund</button>
      </div>
    </>
  );
}

export default App;
