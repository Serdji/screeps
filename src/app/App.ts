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
        LIMIT_HARVESTER_MAX: 4,
        LIMIT_UPGRADER_MAX: 3,
        LIMIT_BUILDER_MAX: 3,
        LIMIT_WORKING_ABROAD_UPGRADER: null,
        LIMIT_WORKING_ABROAD_HARVESTER: null,
        LIMIT_WORKING_ABROAD_ATTACK: 2,

        LIMIT_ATTACK_MAX: null,
        LIMIT_RANGED_MAX: null,

        LEVEL_CREEP: 2,

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
