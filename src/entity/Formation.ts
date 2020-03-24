import {
    Entity,
    Column,
    Unique,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";


@Entity()
@Unique(["titre"])
export class Formation {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    date: number;

    @Column()
    titre: string;
}
