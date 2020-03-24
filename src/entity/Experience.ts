import {
    Entity,
    Column,
    Unique,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";


@Entity()
export class Experience {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    date: string;

    @Column()
    titre: string;

    @Column()
    entreprise: string;

    @Column()
    client: string;

    @Column()
    preembauche: string;

    @Column()
    adresse: string;

    @Column()
    context: Array<string>;

    @Column()
    realisations: Array<string>;

    @Column()
    technologies: Array<string>;

    @Column()
    outils: Array<string>;
}
