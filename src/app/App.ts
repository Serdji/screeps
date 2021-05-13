import { ColonySpawnOne } from "./colony/ColonySpawnOne";

export class App {
  public constructor() {
    this.run();
  }

  private run(): void {
    new ColonySpawnOne("Spawn1", {
      LIMIT_HARVESTER_MAX: 4,
      LIMIT_UPGRADER_MAX: 2,
      LIMIT_BUILDER_MAX: 2,
      LIMIT_WORKING_ABROAD_UPGRADER: 3,
      LIMIT_WORKING_ABROAD_HARVESTER: 2,

      LIMIT_ATTACK_MAX: 6,
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
    });
  }
}
