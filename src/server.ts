import { app } from "./app";

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { server };
