const NODE_ENV = "prod";

export const SERVER_URL =
  NODE_ENV === "prod"
    ? "https://just-post-da.herokuapp.com/api"
    : "http://localhost:5000/api";
