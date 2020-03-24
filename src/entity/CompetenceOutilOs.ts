import {
    Entity,
    Column,
    Unique,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";


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
    type: string;
}
