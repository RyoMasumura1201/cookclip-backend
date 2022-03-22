import app from "./app";

app.listen(process.env.PORT || 8080, () =>
  console.log(`🚀 Server ready at: http://localhost:${process.env.PORT}`),
);
