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
        LIMIT_UPGRADER_MAX: null,
        LIMIT_BUILDER_MAX: null,
        LIMIT_WORKING_ABROAD_UPGRADER: null,
        LIMIT_WORKING_ABROAD_HARVESTER: null,

        LIMIT_ATTACK_MAX: 4,
        LIMIT_RANGED_MAX: null,

        LEVEL_CREEP: 3,

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
