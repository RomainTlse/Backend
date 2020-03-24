import {
    Entity,
    Column,
    Unique, ObjectIdColumn, ObjectID,
} from "typeorm";

@Entity()
@Unique(["idCompetence"])
export class CompetenceFonctionnelle {
    @ObjectIdColumn()
    id: ObjectID; // id MongoDb

    @Column()
    idCompetence: number; // identifiant unique des compétences fonctionnelles

    @Column()
    competence: string; // description de la compétence fonctionnelle
}
