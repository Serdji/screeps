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
        LIMIT_HARVESTER: { size: 2, level: 1 },
        LIMIT_UPGRADER: { size: 2, level: 1 },
        LIMIT_BUILDER: { size: null, level: 1 },
        LIMIT_REFUELLER: { size: null, level: 1 },
        LIMIT_REPAIR: { size: 2, level: 1 },

        LIMIT_ATTACK: { size: null, level: 1 },
        PATROLLING_COORDINATES: [
          [30, 45],
          [18, 43],
          [13, 34],
          [7, 33],
          [5, 16]
        ],
        LIMIT_RANGED: { size: null, level: 1 }
      })
    );
  }
}
