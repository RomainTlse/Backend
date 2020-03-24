/**
 * @author Roamin MONTAUT
 * @name InteretController
 * @classdesc définit toutes les actions CRUD pour les compétences fonctionnelles
 * @version 1.0
 */

import { Request, Response } from "express";
import {getMongoRepository} from "typeorm";
import { validate } from "class-validator";

import { CompetenceFonctionnelle } from "../entity/CompetenceFonctionnelle";

class InteretController{

    /**
     * @name getAll
     * @function Retourne toutes les compétences fonctionnelles
     * @param {Request} req - Requête serveur
     * @param {Response} res - Retour de la requête serveur
     */
    static getAll = async (req: Request, res: Response) => {
        //Get competenceFonctionnelles from database
        const competenceFonctionnelleRepository = getMongoRepository(CompetenceFonctionnelle);
        const competenceFonctionnelles = await competenceFonctionnelleRepository.find({
            select: ["idCompetence", "competence"] //We dont want to send the passwords on response
        });

        //Send the competenceFonctionnelles object
        res.send(competenceFonctionnelles);
    };

    /**
     * @name getOneById
     * @function Retourne la compétence fonctionnelle correspondant à l'id passé en paramètre
     * @param {Request} req - Requête serveur
     * @param {Response} res - Retour de la requête serveur
     */
    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get the competenceFonctionnelle from database
        const competenceFonctionnelleRepository = getMongoRepository(CompetenceFonctionnelle);
        try {
            const competenceFonctionnelle = await competenceFonctionnelleRepository.findOneOrFail(id, {
                select: ["idCompetence", "competence"] //We dont want to send the passwords on response
            });
            res.status(200).send(competenceFonctionnelle);
        } catch (error) {
            res.status(404).send("La compétence fonctionnelle n'existe pas !");
        }
    };

    /**
     * @name save
     * @function Créer une nouvelle compétence fonctionnelle
     * @param {Request} req - Requête serveur
     * @param {Response} res - Retour de la requête serveur
     */
    static save = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { idCompetence, competence } = req.body;
        let competenceFonctionnelle = new CompetenceFonctionnelle();
        competenceFonctionnelle.idCompetence = idCompetence;
        competenceFonctionnelle.competence = competence;

        //Validade if the parameters are ok
        const errors = await validate(competenceFonctionnelle);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the username is already in use
        const competenceFonctionnelleRepository = getMongoRepository(CompetenceFonctionnelle);
        try {
            await competenceFonctionnelleRepository.save(competenceFonctionnelle);
        } catch (e) {
            res.status(409).send("La compétence fonctionnelle existe déjà");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("La competence honctionnelle a correctement été créée");
    };

    /**
     * @name update
     * @function Met à jour la compétence fonctionnelle correcpondant à l'id passé en paramètre
     * @param {Request} req - Requête serveur
     * @param {Response} res - Retour de la requête serveur
     */
    static update = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { competence } = req.body;

        //Try to find competenceFonctionnelle on database
        const competenceFonctionnelleRepository = getMongoRepository(CompetenceFonctionnelle);
        let competenceFonctionnelle;
        try {
            competenceFonctionnelle = await competenceFonctionnelleRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("La cométence fonctionnelle n'existe pas ");
            return;
        }

        //Validate the new values on model
        competenceFonctionnelle.competence = competence;
        const errors = await validate(competenceFonctionnelle);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means competenceFonctionnellename already in use
        try {
            await competenceFonctionnelleRepository.save(competenceFonctionnelle);
        } catch (e) {
            res.status(409).send("Cette compétence fonctionnelle existe déjà !");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send("La compétence a correctement été mis à jour");
    };

    /**
     * @name remove
     * @function Supprime la compétence fonctionnelle correspondant à l'id passé en parametre
     * @param {Request} req - Requête serveur
     * @param {Response} res - Retour de la requête serveur
     */
    static remove = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const competenceFonctionnelleRepository = getMongoRepository(CompetenceFonctionnelle);
        let competenceFonctionnelle: CompetenceFonctionnelle;
        try {
            competenceFonctionnelle = await competenceFonctionnelleRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Cette compétence fonctionnelle n'existe pas");
            return;
        }
        competenceFonctionnelleRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send("La compétence fonctionnelle a correctement été supprimée");
    };
}

export default InteretController;
