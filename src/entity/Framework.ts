import {Column} from "typeorm";

export class Framework {
    @Column()
    name: string;

    @Column()
    image: string;

    /**
     * @constructor
     * @param {string} name
     * @param {string} image
     */
    constructor(name: string, image: string) {
        this.name = name;
        this.image = image;
    }
}
