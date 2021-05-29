/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleWorkingAbroad');
 * mod.thing == 'a thing'; // true
 */
import { CreepAttack } from "./CreepAttack";

export class CreepRoleWorkingAbroadAttack extends CreepAttack {
  private roomName: string;
  private patrollingCoordinates: IProperties["PATROLLING_COORDINATES"];
  public constructor(
    roomName: string,
    nameSpawn: string,
    properties: IProperties,
    patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]
  ) {
    super(nameSpawn, properties);
    this.roomName = roomName; // Имя комнаты, куда отправляем крипса
    this.patrollingCoordinates = patrollingCoordinates; // Координаты
    this.spawn();
  }

  public run(creep: Creep): void {
    // Проверяем, совпадает ли имя комнаты в которой находиться крипс с именем куда ехеть
    // елси нет, едем в ту комнату
    if (creep.room.name !== this.roomName) {
      const exitDir = Game.map.findExit(creep.room, this.roomName) as ExitConstant;
      const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
      creep.moveTo(exit);
      // Как приехали в нужную комнату, начинаем работать
    } else {
      if (!this.toAttack(creep)) {
        this.patrolling(creep, this.patrollingCoordinates);
      }
    }
  }

  public toAttack(creep: Creep): boolean {
    return super.toAttack(creep);
  }

  public patrolling(creep: Creep, patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]) {
    super.patrolling(creep, patrollingCoordinates);
  }


  public spawn(): void {
    const { ROLE_WORKING_ABROAD_ATTACK, LIMIT_WORKING_ABROAD_ATTACK } = this.properties;
    super.spawn(ROLE_WORKING_ABROAD_ATTACK + this.roomName, LIMIT_WORKING_ABROAD_ATTACK);
  }
}
