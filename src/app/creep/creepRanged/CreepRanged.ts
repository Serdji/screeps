import { CreepRole } from "../CreepRole";

export abstract class CreepRanged extends CreepRole {
  /**
   * Авотоматическое создание крипс
   * @param role Роль крипса
   * @param sizeCreeps Колличество крипсов
   */
  public spawn(role: string, limitCreep: ILimitCreep): void {
    const {
      ROOM_ENERGY_LIMIT_550,
      ROOM_ENERGY_LIMIT_800,
      ROOM_ENERGY_LIMIT_1300,

      LEVEL_1,
      LEVEL_2,
      LEVEL_3,

      FIT_RANGED_550,
      FIT_RANGED_800,
      FIT_RANGED_1300
    } = this.properties;

    const creepRole = _.filter(Game.creeps, (creep: Creep) => creep.memory.role === role);
    const sourceID = null;
    const room = Game.spawns[this.nameSpawn].room;
    const roomName = room.name;
    if (limitCreep.size) {
      if (creepRole.length < limitCreep.size) {
        // Крипсы за 550
        if (
          limitCreep.level === LEVEL_1 ||
          (room.energyCapacityAvailable >= ROOM_ENERGY_LIMIT_550 &&
            room.energyCapacityAvailable < ROOM_ENERGY_LIMIT_800)
        ) {
          if (room.energyAvailable >= ROOM_ENERGY_LIMIT_550) {
            this.spawnFit(FIT_RANGED_550, role, sourceID, roomName, LEVEL_1);
          }
          // Крипсы за 800
        } else if (
          limitCreep.level === LEVEL_2 ||
          (room.energyCapacityAvailable >= ROOM_ENERGY_LIMIT_800 &&
            room.energyCapacityAvailable < ROOM_ENERGY_LIMIT_1300)
        ) {
          if (room.energyAvailable >= ROOM_ENERGY_LIMIT_800) {
            this.spawnFit(FIT_RANGED_800, role, sourceID, roomName, LEVEL_2);
          }
          // Крипсы за 1500
        } else if (limitCreep.level === LEVEL_3 || room.energyCapacityAvailable >= ROOM_ENERGY_LIMIT_1300) {
          if (room.energyAvailable >= ROOM_ENERGY_LIMIT_1300) {
            this.spawnFit(FIT_RANGED_1300, role, sourceID, roomName, LEVEL_3);
          }
        }
      }
    }
  }
  /**
   * Создаемм аттакующем крипса
   * @param fit
   * @param role
   * @param sourceID
   * @param roomName
   * @param level
   * @param isForward
   * @param counter
   */
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
}
