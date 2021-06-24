/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleWorkingAbroad');
 * mod.thing == 'a thing'; // true
 */
import { CreepWorking } from "./CreepWorking";

export class CreepRoleWorkingAbroadUpgrader extends CreepWorking {
  private roomName: string;
  public constructor(roomName: string, nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.roomName = roomName; // Имя комнаты, куда отправляем крипса
    this.spawn();
  }

  public run(creep: Creep): void {
    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (creep.room.name !== this.roomName && !creep.memory.upgrading) {
      this.toRoom(creep, this.roomName);
      // Как приехали в нужную комнату, начинаем работать
    } else {
      if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.upgrading = false;
        creep.say("🔄 Копать");
      }
      if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
        creep.memory.upgrading = true;
        creep.say("⚡ Упгрейдить");
      }

      if (creep.memory.upgrading) {
        const constructions = creep.room.find(FIND_CONSTRUCTION_SITES);

        // Проверяем, если имя домашней комнаты не совпадает с комнотой в которой находися крипс, едем в ту комнату
        if (creep.memory.roomName !== creep.room.name && creep.memory.upgrading) {
          this.toHome(creep);
          // Если имена совпали, едем убгрейживать контролер
        } else {
          if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: "#ffffff" } });
          }
        }

        // Ести есть что постороить, строим
        if (constructions.length) {
          const construction = Game.getObjectById(constructions[0].id) as ConstructionSite;
          if (creep.build(construction) === ERR_NOT_IN_RANGE) {
            creep.moveTo(construction, { visualizePathStyle: { stroke: "#ffffff" } });
          }
          // Если нечего стоить и польностью забит клад, едем домой
        } else {
          // Проверяем, если имя домашней комнаты не совпадает с комнотой в которой находися крипс, едем в ту комнату
          if (creep.memory.roomName !== creep.room.name && creep.memory.upgrading) {
            const exitDir = Game.map.findExit(creep.room, creep.memory.roomName) as ExitConstant;
            const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
            creep.moveTo(exit);
            // Если имена совпали, едем убгрейживать контролер
          } else {
            if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller as StructureController, { visualizePathStyle: { stroke: "#ffffff" } });
            }
          }
        }
      } else {
        this.mining(creep);
      }
    }
  }

  public mining(creep: Creep) {
    super.mining(creep);
  }

  public toRoom(creep: Creep, roomName: string): boolean {
    return super.toRoom(creep, roomName);
  }

  public toHome(creep: Creep): boolean {
    return super.toHome(creep);
  }

  public spawn(): void {
    const { ROLE_WORKING_ABROAD_UPGRADER, LIMIT_WORKING_ABROAD_UPGRADER } = this.properties;
    super.spawn(ROLE_WORKING_ABROAD_UPGRADER + this.roomName, LIMIT_WORKING_ABROAD_UPGRADER as ILimitCreep);
  }
}
