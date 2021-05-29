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
        LIMIT_HARVESTER_MAX: { size: 3, level: 1 },
        LIMIT_UPGRADER_MAX: { size: null, level: 1 },
        LIMIT_BUILDER_MAX: { size: null, level: 2 },
        LIMIT_REFUELLER_MAX: { size: 2, level: 2 },
        LIMIT_WORKING_ABROAD_UPGRADER: { size: null, level: 1 },
        LIMIT_WORKING_ABROAD_HARVESTER: { size: null, level: 1 },
        LIMIT_WORKING_ABROAD_ATTACK: { size: 2, level: 2 },

        LIMIT_ATTACK_MAX: { size: 3, level: 2 },
        LIMIT_RANGED_MAX: { size: null, level: 1 },
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
