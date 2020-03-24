import { Router } from "express";
import InteretController from "../controllers/InteretController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

/**
 * GET
 * retourne toutes les interets
 */
router.get("/", [checkJwt, checkRole(["ADMIN"])], InteretController.getAll);

/**
 * GET
 * retourne l'interet correspondant à l'ID
 */
router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    InteretController.getOneById
);

/**
 * POST
 * Enregistre une nouvel interet
 */
router.post("/", [checkJwt, checkRole(["ADMIN"])], InteretController.save);

/**
 * PATCH
 * Modifie la competence fonctionnelle correspondant à l'ID
 */
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    InteretController.update
);

/**
 * DELETE
 * supprime la competence fonctionnelle correspondant à l'ID
 */
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    InteretController.remove
);

export default router;
