import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { AppBar, Toolbar, Typography, Container, Box, Button, Card, CardActions, CardContent } from "@mui/material";

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
  const [indexExample, setIndexExample] = useState<number>(0);

  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const update = useCallback(() => {
    setIndex(getRandomInt(verbs.length));
    setIndexExample(getRandomInt(3));
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
    setIsAnswered(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Memorizator
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          height: "50vh",
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
            }}
          >
            <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
              {verbs[index].value}
            </Typography>
            <Typography variant="h5" component="div">
              {verbs[index].examples[indexExample]}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>{verbs[index].translation}</Typography>
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
            sx={{ position: "absolute", top: "50vh" }}
          >
            Следующий вариант
          </Button>
        )}
      </Container>
    </Box>
  );
}

export default App;
