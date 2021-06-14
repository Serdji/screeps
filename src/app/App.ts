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
        LIMIT_UPGRADER: { size: null, level: 1 }, // Обнавляет контроллер
        LIMIT_BUILDER: { size: null, level: 1 }, // Строитель
        LIMIT_REFUELLER: { size: null, level: 1 }, // Заправщик пушек
        LIMIT_REPAIR: { size: null, level: 1 }, // Ремонтник
        
        LIMIT_FILLER: { size: null, level: 1 }, // Рабочий таскает от хранилеща
        FILLER_CONTAINER_ID: "05b3a0b7e562475ca282e30e", // ID Контейнера для упгрейдоров
        
        LIMIT_STORAGE: { size: null, level: 1 }, // Заправщик хранилеща
        STORAGE_CONTAINER_IDS: [ // ID Контейнеров из которых носить в хранилеще
          "839d853b79ba17e2a091d09e",
          "f0ade9dcde07aa28127bf6a0",
        ],

        LIMIT_ATTACK: { size: null, level: 1 }, // Атакующие
        PATROLLING_COORDINATES: [
          // Координаты для патрулирования
          [30, 45],
          [18, 43],
          [13, 34],
          [7, 33],
          [5, 16]
        ],

        LIMIT_MINER: { size: 1, level: 1 }, // Статический майнер, скклаывает в контейнер. SIZE ВСЕГДА 1
        LIMIT_RANGED: { size: 1, level: 1 }, // Статический стрелок, приезджает на точку и стоит. SIZE ВСЕГДА 1

        MAX_HITS: 5000
      })
    );
  }
}
