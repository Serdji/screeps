export class CreepRole {
  public nameSpawn: string;
  public properties: { [ket: string]: any };

  public constructor(nameSpawn: string, properties: { [ket: string]: any }) {
    this.nameSpawn = nameSpawn;
    this.properties = properties;
  }

  public run(creep: Creep): void {}

  /**
   * Авотоматическое создание крипс
   * @param role Роль крипса
   * @param sizeCreeps Колличество крипсов
   */
  public spawn(role: string, sizeCreeps: number): void {
    const {
      ROLE_ATTACK,

      ROOM_ENERGY_LIMIT_300,
      ROOM_ENERGY_LIMIT_550,
      ROOM_ENERGY_LIMIT_800,
      ROOM_ENERGY_LIMIT_1300,

      LEVEL_CREEP,
      LEVEL_1,
      LEVEL_2,
      LEVEL_3,
      LEVEL_4,
      FIT_WORKING_300,
      FIT_WORKING_550,
      FIT_WORKING_800,
      FIT_WORKING_1300,

      FIT_ATTACK_300,
      FIT_ATTACK_550,
      FIT_ATTACK_800,
      FIT_ATTACK_1300
    } = this.properties;

    const creepRole = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === role);
    const sourceID = null;
    if (sizeCreeps) {
      if (creepRole.length < sizeCreeps) {
        for (const roomName in Game.rooms) {
          // Крипсы за 300
          if (
            LEVEL_CREEP === LEVEL_1 ||
            (Game.rooms[roomName].energyCapacityAvailable >= ROOM_ENERGY_LIMIT_300 &&
              Game.rooms[roomName].energyCapacityAvailable < ROOM_ENERGY_LIMIT_550)
          ) {
            if (Game.rooms[roomName].energyAvailable >= ROOM_ENERGY_LIMIT_300) {
              switch (role) {
                case ROLE_ATTACK:
                  this.spawnFit(FIT_ATTACK_300, role, sourceID, roomName, LEVEL_1);
                  break;
                default:
                  this.spawnFit(FIT_WORKING_300, role, sourceID, roomName, LEVEL_1);
                  break;
              }
            }
            // Крипсы за 550
          } else if (
            LEVEL_CREEP === LEVEL_2 ||
            (Game.rooms[roomName].energyCapacityAvailable >= ROOM_ENERGY_LIMIT_550 &&
              Game.rooms[roomName].energyCapacityAvailable < ROOM_ENERGY_LIMIT_800)
          ) {
            if (Game.rooms[roomName].energyAvailable >= ROOM_ENERGY_LIMIT_550) {
              switch (role) {
                case ROLE_ATTACK:
                  this.spawnFit(FIT_ATTACK_550, role, sourceID, roomName, LEVEL_2);
                  break;
                default:
                  this.spawnFit(FIT_WORKING_550, role, sourceID, roomName, LEVEL_2);
                  break;
              }
            }
            // Крипсы за 800
          } else if (
            LEVEL_CREEP === LEVEL_3 ||
            (Game.rooms[roomName].energyCapacityAvailable >= ROOM_ENERGY_LIMIT_800 &&
              Game.rooms[roomName].energyCapacityAvailable < ROOM_ENERGY_LIMIT_1300)
          ) {
            if (Game.rooms[roomName].energyAvailable >= ROOM_ENERGY_LIMIT_800) {
              switch (role) {
                case ROLE_ATTACK:
                  this.spawnFit(FIT_ATTACK_800, role, sourceID, roomName, LEVEL_3);
                  break;
                default:
                  this.spawnFit(FIT_WORKING_800, role, sourceID, roomName, LEVEL_3);
                  break;
              }
            }
            // Крипсы за 1500
          } else if (
            LEVEL_CREEP === LEVEL_4 ||
            Game.rooms[roomName].energyCapacityAvailable >= ROOM_ENERGY_LIMIT_1300
          ) {
            if (Game.rooms[roomName].energyAvailable >= ROOM_ENERGY_LIMIT_1300) {
              switch (role) {
                case ROLE_ATTACK:
                  this.spawnFit(FIT_ATTACK_1300, role, sourceID, roomName, LEVEL_4);
                  break;
                default:
                  this.spawnFit(FIT_WORKING_1300, role, sourceID, roomName, LEVEL_4);
                  break;
              }
            }
          }
        }
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
    if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }
  }

  /**
   * Собираем фит для крипса
   * @param fit Массив с телом крипса
   * @param role Роль
   * @param sourceID Индекс ресурса на ктороый пойдет майнить крипс
   * @param roomName Имя комноты в которой был создан крипс
   * @param level Уровень крипса
   */
  private spawnFit(
    fit: BodyPartConstant[],
    role: CreepMemory["role"],
    sourceID: CreepMemory["sourceID"],
    roomName: CreepMemory["roomName"],
    level: CreepMemory["level"],
    isForward: CreepMemory["isForward"] = true,
    counter: CreepMemory["counter"] = 0
  ): void {
    const nameCreep = `${this.makeId()}${Game.time}${role}${level}`;
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
}
