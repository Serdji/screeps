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
        LIMIT_BUILDER: { size: 4, level: 1 }, // Строитель
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

        LIMIT_ATTACK: { size: 3, level: 1 }, // Атакующие
        PATROLLING_COORDINATES: [
          // Координаты для патрулирования
          [47, 7],
          [47, 31],
          [35, 39],
          [31, 46],
          [9, 47]
        ],

        LIMIT_MINER: { size: 1, level: 4 }, // Статический майнер, скклаывает в контейнер. SIZE ВСЕГДА 1
        LIMIT_RANGED: { size: null, level: 1 }, // Статический стрелок, приезджает на точку и стоит. SIZE ВСЕГДА 1

        HITS_MAX: 240000 // Максимальное значение Хилов у зданий
      })
    );
  }
}
