import { CreepRole } from "../CreepRole";

export abstract class CreepClime extends CreepRole {
  /**
   * Авотоматическое создание крипс
   * @param role Роль крипса
   * @param limitCreep Колличество крипсов
   */
  public spawn(role: string, limitCreep: ILimitCreep): void {
    const {
      ROOM_ENERGY_LIMIT_800,
      ROOM_ENERGY_LIMIT_1300,

      LEVEL_1,
      LEVEL_2,
      FIT_CLAIM_800,
      FIT_CLAIM_1300
    } = this.properties;

    const creepRole = _.filter(
      Game.creeps,
      (creep: Creep) => creep.memory.role === role && creep.memory.nameSpawn === this.nameSpawn
    );
    const sourceID = null;
    const room = Game.spawns[this.nameSpawn].room;
    const roomName = room.name;
    if (limitCreep.size) {
      if (creepRole.length < limitCreep.size) {
        // Крипсы за 800
        if (
          limitCreep.level === LEVEL_1 ||
          (room.energyCapacityAvailable >= ROOM_ENERGY_LIMIT_800 &&
            room.energyCapacityAvailable < ROOM_ENERGY_LIMIT_1300)
        ) {
          if (room.energyAvailable >= ROOM_ENERGY_LIMIT_800) {
            this.spawnFit(FIT_CLAIM_800, role, sourceID, roomName, LEVEL_1);
          }
          // Крипсы за 1500
        } else if (limitCreep.level === LEVEL_2 || room.energyCapacityAvailable >= ROOM_ENERGY_LIMIT_1300) {
          if (room.energyAvailable >= ROOM_ENERGY_LIMIT_1300) {
            this.spawnFit(FIT_CLAIM_1300, role, sourceID, roomName, LEVEL_2);
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
}
