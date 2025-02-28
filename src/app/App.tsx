import { useCallback, useEffect, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";

import verbs from "./verbs.json";

enum TYPE_OF_VERB {
  "INFINITIVE" = "infinitive",
  "GERUND" = "gerund",
}

enum LEVEL {
  "A1" = "A1",
  "A2" = "A2",
  "B1" = "B1",
  "B2" = "B2",
  "C1" = "C1",
  "C2" = "C2",
}

type Verb = {
  value: string;
  type: TYPE_OF_VERB;
  level: string;
  examples: string[];
  translation: string;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const [currectLevel, setCurrectLevel] = useState<LEVEL>(LEVEL.A1);

  const values = useMemo(() => {
    return (verbs as Verb[]).filter((value) => value.level === currectLevel);
  }, [currectLevel]);

  const [index, setIndex] = useState<number>(0);
  const [indexExample, setIndexExample] = useState<number>(0);

  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const update = useCallback(() => {
    setIndex(getRandomInt(values.length));
    setIndexExample(getRandomInt(3));
  }, [values]);

  useEffect(() => {
    update();
  }, [update]);

  const handleClick = (type: TYPE_OF_VERB) => {
    if (values[index].type === type) {
      enqueueSnackbar("Правильно :)", { variant: "success" });
    } else {
      enqueueSnackbar("Неправильно :(", { variant: "error" });
    }
    setIsAnswered(true);
  };

  const handleChangeLevel = (level: LEVEL) => {
    setCurrectLevel(level);
    setIsAnswered(false);
    update();
  };

  if (!values[index]) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Memorizator
          </Typography>
          <Select
            value={currectLevel}
            onChange={(event) => handleChangeLevel(event.target.value as LEVEL)}
            sx={{ color: "white" }}
          >
            {Object.keys(LEVEL).map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            maxWidth: 400,
            height: 250,
            backgroundColor: "whitesmoke",
          }}
        >
          <CardContent
            sx={{
              height: 150,
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography sx={{ color: "text.secondary", fontSize: 14 }}>{values[index].value}</Typography>
              <Chip
                label={values[index].level}
                color="primary"
                size="small"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                }}
              />
            </Box>
            <Typography variant="h5" component="div">
              {values[index].examples[indexExample]}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>{values[index].translation}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", padding: (theme) => theme.spacing(0, 5) }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => handleClick(TYPE_OF_VERB.INFINITIVE)}
            >
              Infinitive
            </Button>
            <Button size="small" variant="contained" color="secondary" onClick={() => handleClick(TYPE_OF_VERB.GERUND)}>
              Gerund
            </Button>
          </CardActions>
        </Card>
        {isAnswered && (
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              update();
              setIsAnswered(false);
            }}
          >
            Следующий вариант
          </Button>
        )}
      </Container>
    </Box>
  );
}

export default App;
