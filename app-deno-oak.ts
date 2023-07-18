import { serve } from "https://deno.land/std@0.194.0/http/server.ts";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";


const handler = async (_request: Request): Promise<Response> => {
  
  const resp = await fetch("https://api.github.com/users/denoland", {
    // The init object here has an headers object containing a
    // header that indicates what type of response we accept.
    // We're not specifying the method field since by default
    // fetch makes a GET request.
    headers: {
      accept: "application/json",
    },
  });
  const response = await resp.json();
  console.log(response);
  response.day = moment().format('dddd');
  console.log(resp.body);
  return new Response(JSON.stringify(response), {
    status: resp.status,
    headers: {
      "content-type": "application/json",
    },
  });
};

serve(handler);