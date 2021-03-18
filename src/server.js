import { app } from "./index.js";

// Running ...
app.listen(process.env.PORT, () => {
  console.log(`[SERVER] Running on port ${process.env.PORT}...`);
});
