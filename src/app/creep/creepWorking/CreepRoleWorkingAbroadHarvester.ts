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
  private roomToHome: string;
  public constructor(roomName: string, nameSpawn: string, properties: IProperties, roomToHome: string) {
    super(nameSpawn, properties);
    this.roomName = roomName; // Имя комнаты, куда отправляем крипса
    this.roomToHome = roomToHome;
    this.spawn();
  }

  public run(creep: Creep): void {
    this.roomToHome = _.isEmpty(this.roomToHome) ? creep.memory.roomName : this.roomToHome; // Если не задать домашнюю комнату руками, берем комнату из памяти крипса
    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (creep.room.name !== this.roomName && !creep.memory.harvester) {
      this.toRoom(creep, this.roomName);
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
        if (this.roomToHome !== creep.room.name && creep.memory.harvester) {
          this.toHome(creep, this.roomToHome);
          // Если имена совпали, едем убгрейживать контролер
        } else {
          if (this.toSpawnOrExtension(creep)) {
            this.toStorage(creep);
          }
        }
      } else {
        this.mining(creep);
      }
    }
  }

  public toSpawnOrExtension(creep: Creep): boolean {
    return super.toSpawnOrExtension(creep);
  }

  public toSpawn(creep: Creep) {
    super.toSpawn(creep);
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
    const { ROLE_WORKING_ABROAD_HARVESTER, LIMIT_WORKING_ABROAD_HARVESTER } = this.properties;
    super.spawn(ROLE_WORKING_ABROAD_HARVESTER + this.roomName, LIMIT_WORKING_ABROAD_HARVESTER as ILimitCreep);
  }
}
