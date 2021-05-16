import { ColonySpawnOne } from "./colony/ColonySpawnOne";
import { properties } from "./properties";

export class App {
  public constructor() {
    this.run();
  }

  private run(): void {
    new ColonySpawnOne(
      "Spawn1",
      properties({
        LIMIT_HARVESTER_MAX: 2,
        LIMIT_UPGRADER_MAX: 1,
        LIMIT_BUILDER_MAX: 1,
        LIMIT_WORKING_ABROAD_UPGRADER: 2,
        LIMIT_WORKING_ABROAD_HARVESTER: 2,

        LIMIT_ATTACK_MAX: 3,
        LIMIT_RANGED_MAX: null,

        LEVEL_CREEP: 2,

        ROOM_MANE: "W7N3",
        ROOM_IS_ATTACK: true,
        PATROLLING_COORDINATES: [
          [45, 20],
          [45, 30],
          [45, 38],
          [35, 39],
          [23, 47],
          [9, 47]
        ]
      })
    );
  }
}
