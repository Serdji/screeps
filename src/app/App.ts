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
        LIMIT_BUILDER: { size: null, level: 2 },
        LIMIT_REFUELLER: { size: null, level: 2 },

        LIMIT_ATTACK: { size: null, level: 2 },
        PATROLLING_COORDINATES: [
          [45, 20],
          [45, 30],
          [45, 38],
          [35, 39],
          [23, 47],
          [9, 47]
        ],
        LIMIT_RANGED: { size: null, level: 1 }
      })
    );
  }
}
