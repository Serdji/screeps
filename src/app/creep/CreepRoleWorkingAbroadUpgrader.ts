/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleWorkingAbroad');
 * mod.thing == 'a thing'; // true
 */
import { CreepRole } from "./CreepRole";
import { properties } from "../properties";

const { ROLE_WORKING_ABROAD_UPGRADER, LIMIT_WORKING_ABROAD_UPGRADER } = properties;

export class CreepRoleWorkingAbroadUpgrader extends CreepRole {
  private roomName: string;
  public constructor(roomName: string) {
    super();
    this.roomName = roomName; // Имя комнаты, куда отправляем крипса
  }

  public run(creep: Creep): void {
    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (creep.room.name !== this.roomName && !creep.memory.upgrading) {
      const exitDir = Game.map.findExit(creep.room, this.roomName) as ExitConstant;
      const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
      creep.moveTo(exit);
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
        super.mining(creep);
      }
    }
  }

  public spawn(): void {
    super.spawn(ROLE_WORKING_ABROAD_UPGRADER + this.roomName, LIMIT_WORKING_ABROAD_UPGRADER);
  }
};
