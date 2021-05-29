import { CreepRole } from "../CreepRole";

export class CreepAttack extends CreepRole {
  /**
   * Авотоматическое создание крипс
   * @param role Роль крипса
   * @param sizeCreeps Колличество крипсов
   */
  public spawn(role: string, limitCreep: ILimitCreep): void {
    const {
      ROOM_ENERGY_LIMIT_300,
      ROOM_ENERGY_LIMIT_550,
      ROOM_ENERGY_LIMIT_800,
      ROOM_ENERGY_LIMIT_1300,

      LEVEL_1,
      LEVEL_2,
      LEVEL_3,
      LEVEL_4,

      FIT_ATTACK_300,
      FIT_ATTACK_550,
      FIT_ATTACK_800,
      FIT_ATTACK_1300,
    } = this.properties;

    const creepRole = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === role);
    const sourceID = null;
    if (limitCreep.size) {
      if (creepRole.length < limitCreep.size) {
        for (const roomName in Game.rooms) {
          // Крипсы за 300
          if (
            limitCreep.level === LEVEL_1 ||
            (Game.rooms[roomName].energyCapacityAvailable >= ROOM_ENERGY_LIMIT_300 &&
              Game.rooms[roomName].energyCapacityAvailable < ROOM_ENERGY_LIMIT_550)
          ) {
            if (Game.rooms[roomName].energyAvailable >= ROOM_ENERGY_LIMIT_300) {
              this.spawnFit(FIT_ATTACK_300, role, sourceID, roomName, LEVEL_1);
            }
            // Крипсы за 550
          } else if (
            limitCreep.level === LEVEL_2 ||
            (Game.rooms[roomName].energyCapacityAvailable >= ROOM_ENERGY_LIMIT_550 &&
              Game.rooms[roomName].energyCapacityAvailable < ROOM_ENERGY_LIMIT_800)
          ) {
            if (Game.rooms[roomName].energyAvailable >= ROOM_ENERGY_LIMIT_550) {
              this.spawnFit(FIT_ATTACK_550, role, sourceID, roomName, LEVEL_2);
            }
            // Крипсы за 800
          } else if (
            limitCreep.level === LEVEL_3 ||
            (Game.rooms[roomName].energyCapacityAvailable >= ROOM_ENERGY_LIMIT_800 &&
              Game.rooms[roomName].energyCapacityAvailable < ROOM_ENERGY_LIMIT_1300)
          ) {
            if (Game.rooms[roomName].energyAvailable >= ROOM_ENERGY_LIMIT_800) {
              this.spawnFit(FIT_ATTACK_800, role, sourceID, roomName, LEVEL_3);
            }
            // Крипсы за 1500
          } else if (
            limitCreep.level === LEVEL_4 ||
            Game.rooms[roomName].energyCapacityAvailable >= ROOM_ENERGY_LIMIT_1300
          ) {
            if (Game.rooms[roomName].energyAvailable >= ROOM_ENERGY_LIMIT_1300) {
              this.spawnFit(FIT_ATTACK_1300, role, sourceID, roomName, LEVEL_4);
            }
          }
        }
      }
    }
  }

  public spawnFit(
    fit: BodyPartConstant[],
    role: CreepMemory["role"],
    sourceID: CreepMemory["sourceID"],
    roomName: CreepMemory["roomName"],
    level: CreepMemory["level"],
    isForward: CreepMemory["isForward"] = true,
    counter: CreepMemory["counter"] = 0
  ) {
    super.spawnFit(fit, role, sourceID, roomName, level, isForward, counter);
  }

  /**
   * Метод для аттаки
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
        creep.moveTo(structureInvaderCore);
      }
      return true;
    }
    return false;
  }

  /**
   * Метод для потрулирование атакующих крипсов
   * @param creep
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
}
