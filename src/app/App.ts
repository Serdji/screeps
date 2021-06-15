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
        LIMIT_HARVESTER: { size: null, level: 1 }, // Стандартный рабочий
        LIMIT_UPGRADER: { size: 4, level: 1 }, // Обнавляет контроллер
        LIMIT_BUILDER: { size: null, level: 1 }, // Строитель
        LIMIT_REFUELLER: { size: 1, level: 1 }, // Заправщик пушек
        LIMIT_REPAIR: { size: null, level: 1 }, // Ремонтник

        LIMIT_FILLER: { size: 3, level: 1 }, // Рабочий таскает от хранилеща
        FILLER_CONTAINER_ID: "f147bc7f15a397c", // ID Контейнера для упгрейдоров

        LIMIT_STORAGE: { size: 1, level: 4 }, // Заправщик хранилеща
        STORAGE_CONTAINER_IDS: [
          // ID Контейнеров из которых носить в хранилеще
          "7f99bad8557fe20",
          "7530fa6a11d02ef"
        ],

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
