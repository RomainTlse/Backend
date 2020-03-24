import {
    Entity,
    Column,
    Unique,
    ObjectIdColumn,
    ObjectID,
} from "typeorm";


@Entity()
@Unique(["name"])
export class Interet {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    titre: string;

    @Column()
    image: string;

    @Column()
    description: string;
}
