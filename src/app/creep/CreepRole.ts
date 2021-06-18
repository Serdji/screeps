export abstract class CreepRole {
  public nameSpawn: string;
  public properties: IProperties;

  public constructor(nameSpawn: string, properties: IProperties) {
    this.nameSpawn = nameSpawn;
    this.properties = properties;
  }

  public run(creep: Creep): void {}

  /**
   * Отображение загрузки энергии
   * @param creep
   */
  public toLouder(creep: Creep) {
    const percent: number = (creep.store[RESOURCE_ENERGY] / creep.store.getCapacity()) * 100;
    let louder: string = "🔴" as string;
    if (_.ceil(percent) >= 30 && _.ceil(percent) < 60) {
      louder = "🟠";
    } else if (_.ceil(percent) >= 60 && _.ceil(percent) < 90) {
      louder = "🟡";
    } else if (_.ceil(percent) >= 90 && _.ceil(percent) <= 100) {
      louder = "🟢";
    }

    creep.say(`${louder} ${_.ceil(percent)}%`);
  }

  /**
   * Отправляем крипса в сосденюю комнату
   * @param creep
   * @param roomName
   */
  public toRoom(creep: Creep, roomName: string): boolean {
    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (creep.room.name !== roomName) {
      const exitDir = creep.room.findExitTo(roomName) as ExitConstant;
      const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
      creep.moveTo(exit);
      return false;
      // Как приехали в нужную комнату, начинаем работать
    }
    return true;
  }

  /**
   * Отправляем крипса домой
   * @param creep
   */
  public toHome(creep: Creep): boolean {
    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (creep.memory.roomName !== creep.room.name) {
      const exitDir = creep.room.findExitTo(creep.memory.roomName) as ExitConstant;
      const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
      creep.moveTo(exit);
      return false;
      // Как приехали в нужную комнату, начинаем работать
    }
    return true;
  }

  /**
   * Резервирования контроллера
   * @param creep
   */
  public toReserveController(creep: Creep) {
    if (creep.room.controller) {
      if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  }

  /**
   * Рандомное распределение крисаов на майниг ресурсов
   * @param creep
   */
  public mining(creep: Creep): void {
    const sources: Source[] = creep.room.find(FIND_SOURCES);
    const quantitySources = sources.length - 1;
    if (creep.memory.sourceID === null) {
      const sourceId: Id<Source> = sources[_.random(0, quantitySources)].id;
      creep.memory.sourceID = sourceId;
    }
    const source = Game.getObjectById(creep.memory.sourceID) as Source;
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
    } else {
      this.toLouder(creep);
    }
  }

  /**
   * Брать ресурсы из зранилища иначе майнить
   * @param creep
   */
  public miningStorageOrSources(creep: Creep) {
    const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_STORAGE
    }) as StructureSpawn;
    if (storage) {
      if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(storage, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      this.mining(creep);
    }
  }

  /**
   * Забираем ресурсы из контейнера
   * @param creep
   * @param containerId
   */
  public miningContainer(creep: Creep, containerId: string): void {
    const container = Game.getObjectById(containerId as Id<StructureContainer>) as StructureContainer;
    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(container, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  }

  /**
   * Забираем ресурсы из контейнера
   * @param creep
   * @param containerId
   */
  public miningStorage(creep: Creep): void {
    const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_STORAGE
    }) as StructureSpawn;
    if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(storage, { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  }

  /**
   * Отправка крипса на спавн
   * @param creep
   */
  public toSpawn(creep: Creep): void {
    const spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_SPAWN
    }) as StructureSpawn;
    if (creep.moveTo(spawn) === ERR_TIRED) {
      creep.moveTo(spawn);
    }
  }

  /**
   * Заполненеие энергией обещго хранилеща
   * @param creep
   */
  public toStorage(creep: Creep): void {
    const storage = creep.room.find(FIND_STRUCTURES, {
      filter: structure =>
        structure.structureType === STRUCTURE_STORAGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    }) as StructureStorage[];
    // Несем в общее хранилище
    if (storage.length) {
      const target = Game.getObjectById(storage[0].id) as Structure;
      if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: "#d6e815" } });
      } else {
        creep.memory.counter++;
      }
    } else {
      this.toSpawn(creep);
    }
  }

  /**
   * Собираем фит для крипса
   * @param fit Массив с телом крипса
   * @param role Роль
   * @param sourceID Индекс ресурса на ктороый пойдет майнить крипс
   * @param roomName Имя комноты в которой был создан крипс
   * @param level Уровень крипса
   * @param isForward Переключения движения потрульных
   * @param counter Счетчек
   */
  public spawnFit(
    fit: BodyPartConstant[],
    role: CreepMemory["role"],
    sourceID: CreepMemory["sourceID"],
    roomName: CreepMemory["roomName"],
    level: CreepMemory["level"],
    isForward: CreepMemory["isForward"] = true,
    counter: CreepMemory["counter"] = 0
  ): void {
    const nameCreep = `${this.makeId()}#${Game.time}#${role}#${level}`;
    const memory = {
      role,
      sourceID,
      roomName,
      isForward,
      counter,
      level
    } as CreepMemory;
    if (Game.spawns[this.nameSpawn].spawnCreep(fit, nameCreep, { memory }) === OK) {
      console.log(`Новый крипт | Роль -> ${role} | Имя -> ${nameCreep}`);
    }
  }

  /**
   * Рандомная генерация имени крипса
   * @returns {string}
   */
  private makeId(): string {
    const { SIZE_NAME_CREEP } = this.properties;
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < SIZE_NAME_CREEP; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Строить
   * @param creep
   */
  public toBuilder(creep: Creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say("🔄 Копать");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say("🏗 Строить");
    }

    if (creep.memory.building) {
      const constructions = creep.room.find(FIND_CONSTRUCTION_SITES);

      const structureRepairs = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
      });
      structureRepairs.sort((a, b) => a.hits - b.hits);

      // Если есть что сторить, крипс идет строить
      if (constructions.length) {
        const construction = Game.getObjectById(constructions[0].id) as ConstructionSite;
        if (creep.build(construction) === ERR_NOT_IN_RANGE) {
          creep.moveTo(construction, { visualizePathStyle: { stroke: "#26e815" } });
        }
      } else {
        this.toStorage(creep);
      }
    } else {
      this.miningStorageOrSources(creep);
    }
  }

  /**
   * Ремонт
   * @param creep
   */
  public toRepair(creep: Creep) {
    const { HITS_MAX } = this.properties;
    if (creep.memory.repair && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.repair = false;
      creep.say("🔄 Копать");
    }
    if (!creep.memory.repair && creep.store.getFreeCapacity() === 0) {
      creep.memory.repair = true;
      creep.say("🚧 Ремонтировать");
    }

    if (creep.memory.repair) {
      const structureRepairs = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax && object.hits <= HITS_MAX
      });
      structureRepairs.sort((a, b) => a.hits - b.hits);

      // Если есть что ремонтировать, крипс идет ремонтировать
      if (structureRepairs.length) {
        const structureRepair = Game.getObjectById(structureRepairs[0].id) as Structure;
        if (creep.repair(structureRepair) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structureRepair, { visualizePathStyle: { stroke: "#26e815" } });
        }
      } else {
        this.toStorage(creep);
      }
    } else {
      this.mining(creep);
    }
  }

  /**
   * Заправка Спавна
   * @param creep
   */
  public toSpawnOrExtension(creep: Creep): boolean {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure =>
        (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    });
    // Если есть куда носить ресурсы, несем туда
    if (!_.isEmpty(targets)) {
      const target = Game.getObjectById(targets[0].id) as Structure;
      if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: "#d6e815" } });
      }
    }
    return _.isEmpty(targets);
  }

  /**
   * Сбор энергии
   * @param creep
   */
  public toHarvester(creep: Creep) {
    if (creep.memory.harvester && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.harvester = false;
      creep.say("🔄 Копать");
    }
    if (!creep.memory.harvester && creep.store.getFreeCapacity() === 0) {
      creep.memory.harvester = true;
      creep.say("⛽ Заправлять");
    }

    if (creep.memory.harvester) {
      if (this.toSpawnOrExtension(creep)) {
        this.toStorage(creep);
      }
    } else {
      this.mining(creep);
    }
  }

  /**
   * Тоскать из хранилища и разносить
   * @param creep
   * @param container
   */
  public toFiller(creep: Creep, container: StructureContainer) {
    if (creep.memory.filler && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.filler = false;
      creep.say("🔄 Загрузить");
    }
    if (!creep.memory.filler && creep.store.getFreeCapacity() === 0) {
      creep.memory.filler = true;
      creep.say("⛽ Заправлять");
    }

    if (creep.memory.filler) {
      if (this.toSpawnOrExtension(creep)) {
        if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container, { visualizePathStyle: { stroke: "#d6e815" } });
        }
      }
    } else {
      this.miningStorage(creep);
    }
  }

  /**
   * Таскаем ресурсы из контейнера в сторедж
   * @param creep
   * @param containerId
   */
  public toHarvesterStorage(creep: Creep, containerId: string) {
    if (creep.memory.storage && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.storage = false;
      creep.say("🔄 Загружаться");
    }
    if (!creep.memory.storage && creep.store.getFreeCapacity() === 0) {
      creep.memory.storage = true;
      creep.say("⛽ Заправлять");
    }

    if (creep.memory.storage) {
      this.toStorage(creep);
    } else {
      this.miningContainer(creep, containerId);
    }
  }

  /**
   * Статический метод для добычи ресурсов
   * @param creep
   */
  public toStaticHarvester(creep: Creep) {
    const target = creep.pos.findClosestByRange(FIND_SOURCES);
    if (target) {
      creep.harvest(target);
    }
  }

  /**
   * Зарядка пушки
   * @param creep
   */
  public toRefueller(creep: Creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say("🔄 Копать");
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say("⛽ Заправлять");
    }

    if (creep.memory.building) {
      const structureTowers = creep.room.find(FIND_STRUCTURES, {
        filter: structure =>
          structure.structureType === STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      });

      // Заправить пушку
      if (structureTowers.length) {
        const structureTower = Game.getObjectById(structureTowers[0].id) as StructureTower;
        if (creep.transfer(structureTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structureTower, { visualizePathStyle: { stroke: "#d6e815" } });
        }
        // Если пушка заряжана, отдать энергию спавну
      }
    } else {
      this.miningStorageOrSources(creep);
    }
  }

  /**
   * Упгрейд контроллера
   * @param creep
   * @param containerId
   */
  public toUpgrader(creep: Creep, containerId: string) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false;
      creep.say("🔄 Копать");
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true;
      creep.say("⚡ Упгрейдить");
    }

    // Едем упгрейдить контролер
    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: "#e87b15" } });
      }
    } else {
      if (containerId) {
        this.miningContainer(creep, containerId);
      } else {
        this.mining(creep);
      }
    }
  }

  /**
   * Аттака
   * @param creep
   */
  public toAttack(creep: Creep): boolean {
    // Ищим вражеских кпсов
    const hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    // Ищим вражеские страения
    const structureInvaderCores = creep.room.find(FIND_HOSTILE_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_INVADER_CORE
    });

    if (hostileCreeps) {
      if (creep.attack(hostileCreeps) === ERR_NOT_IN_RANGE) {
        creep.moveTo(hostileCreeps);
      }
      return true;
    } else if (structureInvaderCores.length) {
      const structureInvaderCore = Game.getObjectById(structureInvaderCores[0].id) as StructureInvaderCore;
      if (creep.attack(structureInvaderCore) === ERR_NOT_IN_RANGE) {
        creep.moveTo(structureInvaderCore, { visualizePathStyle: { stroke: "#e82315" } });
      }
      return true;
    }
    return false;
  }

  /**
   * Метод для потрулирование атакующих крипсов
   * @param creep
   * @param patrollingCoordinates
   */
  public patrolling(creep: Creep, patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]) {
    patrollingCoordinates.forEach(([x, y], i) => {
      if (creep.memory.isForward) {
        if (creep.memory.counter === i) {
          if (creep.pos.x === x && creep.pos.y === y) creep.memory.counter++;
          creep.moveTo(x, y);
        }
        if (creep.memory.counter >= patrollingCoordinates.length - 1) creep.memory.isForward = false;
      } else {
        if (creep.memory.counter === i) {
          if (creep.pos.x === x && creep.pos.y === y) creep.memory.counter--;
          creep.moveTo(x, y);
          if (creep.memory.counter <= 0) creep.memory.isForward = true;
        }
      }
    });
  }

  /**
   * Маршрут по хранилищам
   * @param creep
   * @param containerIds
   */
  public toRouteContainerToStorage(creep: Creep, containerIds: IProperties["STORAGE_CONTAINER_IDS"]) {
    const size = containerIds.length;
    if (creep.memory.counter === size) creep.memory.counter = 0;
    this.toHarvesterStorage(creep, containerIds[creep.memory.counter]);
  }

  /**
   * Стрельба по цели
   * @param creep
   */
  public toRanged(creep: Creep) {
    const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    if (targets.length > 0) {
      creep.rangedAttack(targets[0]);
    }
  }

  /**
   * Позиция для стоянке
   * @param creep
   * @param parkingCoordinates
   */
  public parking(creep: Creep, parkingCoordinates: RoomPosition): boolean {
    return creep.moveTo(parkingCoordinates) === OK;
  }
}
