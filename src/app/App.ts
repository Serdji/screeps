import { ColonySpawnOne } from "./colony/ColonySpawnOne";
import { ColonySpawnTwo } from "./colony/ColonySpawnTwo";
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
        LIMIT_UPGRADER: { size: 2, level: 1 }, // Обнавляет контроллер
        LIMIT_BUILDER: { size: null, level: 1 }, // Строитель
        LIMIT_REFUELLER: { size: 1, level: 1 }, // Заправщик пушек
        LIMIT_REPAIR: { size: 1, level: 1 }, // Ремонтник

        LIMIT_FILLER: { size: 2, level: 2 }, // Рабочий таскает от хранилеща
        FILLER_CONTAINER_ID: "60d215d43769f6d32895133b", // ID Контейнера для упгрейдоров

        LIMIT_STORAGE: { size: 1, level: 4 }, // Заправщик хранилеща
        STORAGE_CONTAINER_IDS: [
          // ID Контейнеров из которых носить в хранилеще
          "60d1b046c29e8968bb925dc4",
          "60d1e044ee99d3beb752d371"
        ],

        LIMIT_ATTACK: { size: null, level: 1 }, // Атакующие
        PATROLLING_COORDINATES: [
          // Координаты для патрулирования
          [12, 11],
          [17, 17]
        ],

        LIMIT_MINER: { size: 1, level: 4 }, // Статический майнер, скклаывает в контейнер. SIZE ВСЕГДА 1
        LIMIT_RANGED: { size: 1, level: 1 }, // Статический стрелок, приезджает на точку и стоит. SIZE ВСЕГДА 1

        HITS_MAX: 240000 // Максимальное значение Хилов у зданий
      })
    );

    new ColonySpawnTwo(
      "Spawn2",
      properties({
        LIMIT_HARVESTER: { size: null, level: 1 }, // Стандартный рабочий
        LIMIT_UPGRADER: { size: null, level: 1 }, // Обнавляет контроллер
        LIMIT_BUILDER: { size: null, level: 1 }, // Строитель
        LIMIT_REFUELLER: { size: null, level: 1 }, // Заправщик пушек
        LIMIT_REPAIR: { size: null, level: 1 }, // Ремонтник

        LIMIT_FILLER: { size: null, level: 2 }, // Рабочий таскает от хранилеща
        FILLER_CONTAINER_ID: "60d215d43769f6d32895133b", // ID Контейнера для упгрейдоров

        LIMIT_STORAGE: { size: null, level: 4 }, // Заправщик хранилеща
        STORAGE_CONTAINER_IDS: [
          // ID Контейнеров из которых носить в хранилеще
          "60d1e044ee99d3beb752d371",
          "60d1b046c29e8968bb925dc4"
        ],

        LIMIT_ATTACK: { size: null, level: 1 }, // Атакующие
        PATROLLING_COORDINATES: [
          // Координаты для патрулирования
          [12, 11],
          [17, 17]
        ],

        LIMIT_MINER: { size: null, level: 4 }, // Статический майнер, скклаывает в контейнер. SIZE ВСЕГДА 1
        LIMIT_RANGED: { size: null, level: 1 }, // Статический стрелок, приезджает на точку и стоит. SIZE ВСЕГДА 1

        HITS_MAX: 240000 // Максимальное значение Хилов у зданий
      })
    );
  }
}
