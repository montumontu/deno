import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { addNumbers } from "./modules/user.js";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";


const app = new Application();
const router = new Router();

// Define route handlers
router.get("/", (ctx) => {
  const response = [
    {
      name: "Ashok",
      age: 30,
    },
    {
      name: "Raj",
      age: 40,
    }]
  ctx.response.body = response;
});

router.post("/", async (ctx) => {
  const body = await ctx.request.body().value;
  console.log(body);
  const day = moment().format('dddd');
  console.log(day);
  const sum = addNumbers(4, 5);
  ctx.response.status = 201;
  ctx.response.body = { sum };
});

router.get("/about", (ctx) => {
  ctx.response.body = "This is the about page.";
});

router.get("/contact", (ctx) => {
  ctx.response.body = "This is the contact page.";
});

// Add the router middleware to the application
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
console.log("🌳 oak server running at http://localhost:2345/ 🌳");
await app.listen({ port: 2345 });
