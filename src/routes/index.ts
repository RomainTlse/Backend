import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import competenceFonctionnelle from "./competenceFonctionnelle";

const routes = Router();

routes.use("/api/auth", auth);
routes.use("/api/user", user);
routes.use("/api/competencefonctionnelle", competenceFonctionnelle);

export default routes;
