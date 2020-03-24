import { Router } from "express";
import CompetenceFonctionnelleController from "../controllers/CompetenceFonctionnelleController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

/**
 * GET
 * retourne toutes les cométences fonctionnelles
 */
router.get("/", [checkJwt, checkRole(["ADMIN"])], CompetenceFonctionnelleController.getAll);

/**
 * GET
 * retourne la competence fonctionnelle correspondant à l'ID
 */
router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    CompetenceFonctionnelleController.getOneById
);

/**
 * POST
 * Enregistre une nouvelle compétence fonctionnelle
 */
router.post("/", [checkJwt, checkRole(["ADMIN"])], CompetenceFonctionnelleController.save);

/**
 * PATCH
 * Modifie la competence fonctionnelle correspondant à l'ID
 */
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    CompetenceFonctionnelleController.update
);

/**
 * DELETE
 * supprime la competence fonctionnelle correspondant à l'ID
 */
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    CompetenceFonctionnelleController.remove
);

export default router;
