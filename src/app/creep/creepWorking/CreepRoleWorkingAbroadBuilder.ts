/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleWorkingAbroad');
 * mod.thing == 'a thing'; // true
 */
import { CreepWorking } from "./CreepWorking";

export class CreepRoleWorkingAbroadBuilder extends CreepWorking {
  private roomName: string;
  private roomToHome: string;
  public constructor(roomName: string, nameSpawn: string, properties: IProperties, roomToHome = "") {
    super(nameSpawn, properties);
    this.roomName = roomName; // Имя комнаты, куда отправляем крипса
    this.roomToHome = roomToHome;
    this.spawn();
  }

  public run(creep: Creep): void {
    this.roomName = _.isEmpty(this.roomToHome) ? creep.room.name : this.roomToHome; // Если не задать домашнюю комнату руками, берем комнату из памяти крипса
    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (this.roomName !== this.roomName && !creep.memory.building) {
      this.toRoom(creep, this.roomName);
      // Как приехали в нужную комнату, начинаем работать
    } else {
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

        // Ести есть что постороить, строим
        if (constructions.length) {
          const construction = Game.getObjectById(constructions[0].id) as ConstructionSite;
          if (creep.build(construction) === ERR_NOT_IN_RANGE) {
            creep.moveTo(construction, { visualizePathStyle: { stroke: "#ffffff" } });
          }
          // Если нечего стоить и польностью забит клад, едем домой
        } else {
          // Проверяем, если имя домашней комнаты не совпадает с комнотой в которой находися крипс, едем в ту комнату
          if (creep.memory.roomName !== this.roomName && creep.memory.building) {
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

  public toHome(creep: Creep, roomToHome: string): boolean {
    return super.toHome(creep, roomToHome);
  }

  public spawn(): void {
    const { ROLE_WORKING_ABROAD_BUILDER, LIMIT_WORKING_ABROAD_BUILDER } = this.properties;
    super.spawn(ROLE_WORKING_ABROAD_BUILDER + this.roomName, LIMIT_WORKING_ABROAD_BUILDER as ILimitCreep);
  }
}
