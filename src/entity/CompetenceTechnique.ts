import {
    Entity,
    Column,
    Unique,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";
import {Framework} from "./Framework";


@Entity()
@Unique(["name"])
export class CompetenceOutilOs {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    interet: string;

    @Column(type => Framework)
    frameworks: Framework[];
}

