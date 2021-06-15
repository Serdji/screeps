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
        LIMIT_HARVESTER: { size: 3, level: 1 }, // Стандартный рабочий
        LIMIT_UPGRADER: { size: 1, level: 1 }, // Обнавляет контроллер
        LIMIT_BUILDER: { size: 3, level: 2 }, // Строитель
        LIMIT_REFUELLER: { size: 3, level: 2 }, // Заправщик пушек
        LIMIT_REPAIR: { size: null, level: 1 }, // Ремонтник
        
        LIMIT_FILLER: { size: null, level: 1 }, // Рабочий таскает от хранилеща
        FILLER_CONTAINER_ID: "", // ID Контейнера для упгрейдоров
        
        LIMIT_STORAGE: { size: null, level: 1 }, // Заправщик хранилеща
        STORAGE_CONTAINER_IDS: [
          // ID Контейнеров из которых носить в хранилеще
          "",
          ""
        ],

        LIMIT_ATTACK: { size: 3, level: 1 }, // Атакующие
        PATROLLING_COORDINATES: [
          // Координаты для патрулирования
          [47, 7],
          [47, 31],
          [35, 39],
          [31, 46],
          [9, 47]
        ],

        LIMIT_MINER: { size: 1, level: 1 }, // Статический майнер, скклаывает в контейнер. SIZE ВСЕГДА 1
        LIMIT_RANGED: { size: null, level: 1 }, // Статический стрелок, приезджает на точку и стоит. SIZE ВСЕГДА 1

        HITS_MAX: 240000 // Максимальное значение Хилов у зданий
      })
    );
  }
}
