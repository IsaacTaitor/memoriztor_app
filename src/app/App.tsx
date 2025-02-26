import { useCallback, useEffect, useState } from 'react'
import './App.css'
import verbs from './verbs.json'
import { useSnackbar } from 'notistack';

enum TYPE_OF_VERB {
  "INFINITIVE" = "infinite",
  "GERUND" = "gerund"
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [type, setType] = useState<TYPE_OF_VERB | null>(null)
  const [index, setIndex] = useState<number>(0)
  const { enqueueSnackbar } = useSnackbar();

  const update = useCallback(() => {
    setType(getRandomInt(2) === 1 ? TYPE_OF_VERB.GERUND : TYPE_OF_VERB.INFINITIVE);
    setIndex(getRandomInt(verbs.gerund.length));
  }, [])

  useEffect(() => {
    update()
  }, [update])

  const handleClick = (value: TYPE_OF_VERB) => {
    if (type === value) {
      enqueueSnackbar('Правильно :)', { variant: "success" });
    } else {
      enqueueSnackbar('Неправильно :(', { variant: "error" });
    }
    update();
  }

  if (!type) return null;

  return (
    <>
      <h1>Memorizator</h1>
      <h4>{Object.keys(verbs[type][index])}</h4>
      <div className="card">
        <button onClick={() => handleClick(TYPE_OF_VERB.INFINITIVE)}>
          Infinitive
        </button>
        <button onClick={() => handleClick(TYPE_OF_VERB.GERUND)}>
          Gerund
        </button>
      </div>
    </>
  )
}

export default App
