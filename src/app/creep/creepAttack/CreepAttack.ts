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

  /**
   * Отправляем крипса в сосденюю комнату
   * @param creep
   * @param roomName
   */
  public toRoom(creep: Creep, roomName: string): boolean {
    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (creep.room.name !== roomName) {
      const exitDir = Game.map.findExit(creep.room, roomName) as ExitConstant;
      const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
      creep.moveTo(exit);
      return true;
      // Как приехали в нужную комнату, начинаем работать
    }
    return false;
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
