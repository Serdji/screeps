/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleWorkingAbroad');
 * mod.thing == 'a thing'; // true
 */
import { CreepWorking } from "./CreepWorking";

export class CreepRoleWorkingAbroadHarvester extends CreepWorking {
  private roomName: string;
  public constructor(roomName: string, nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.roomName = roomName; // Имя комнаты, куда отправляем крипса
    this.spawn();
  }

  public run(creep: Creep): void {
    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (creep.room.name !== this.roomName && !creep.memory.harvester) {
      const exitDir = creep.room.findExitTo(this.roomName) as ExitConstant;
      const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
      creep.moveTo(exit);
      // Как приехали в нужную комнату, начинаем работать
    } else {
      if (creep.memory.harvester && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.harvester = false;
        creep.say("🔄 Копать");
      }
      if (!creep.memory.harvester && creep.store.getFreeCapacity() === 0) {
        creep.memory.harvester = true;
        creep.say("⛽ Заправлять");
      }

      if (creep.memory.harvester) {
        // Проверяем, если имя домашней комнаты не совпадает с комнотой в которой находися крипс, едем в ту комнату
        if (creep.memory.roomName !== creep.room.name && creep.memory.harvester) {
          const exitDir = creep.room.findExitTo(creep.memory.roomName) as ExitConstant;
          const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
          creep.moveTo(exit);
          // Если имена совпали, едем убгрейживать контролер
        } else {
          const targets = creep.room.find(FIND_STRUCTURES, {
            filter: structure =>
              (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          });
          // Если есть куда носить ресурсы, несем туда
          if (targets.length) {
            const target = Game.getObjectById(targets[0].id) as Structure;
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
            }
          } else {
            super.toStorage(creep);
          }
        }
      } else {
        super.mining(creep);
      }
    }
  }

  public spawn(): void {
    const { ROLE_WORKING_ABROAD_HARVESTER, LIMIT_WORKING_ABROAD_HARVESTER } = this.properties;
    super.spawn(ROLE_WORKING_ABROAD_HARVESTER + this.roomName, LIMIT_WORKING_ABROAD_HARVESTER as ILimitCreep);
  }
}
