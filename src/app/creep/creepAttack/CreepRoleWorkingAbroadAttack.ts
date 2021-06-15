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
  private roomNames: string[];
  private patrollingCoordinates: IProperties["PATROLLING_COORDINATES"];
  public constructor(
    roomNames: string[],
    nameSpawn: string,
    properties: IProperties,
    patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]
  ) {
    super(nameSpawn, properties);
    this.roomNames = roomNames; // Имя комнаты, куда отправляем крипса
    this.patrollingCoordinates = patrollingCoordinates; // Координаты
    this.spawn();
  }

  public run(creep: Creep): void {
    if (this.toRooms(creep, this.roomNames)) {
      if (!this.toAttack(creep)) {
        this.patrolling(creep, this.patrollingCoordinates);
      }
    }
  }

  public toRooms(creep: Creep, roomNames: string[]): boolean {
    return super.toRooms(creep, roomNames);
  }

  public toAttack(creep: Creep): boolean {
    return super.toAttack(creep);
  }

  public patrolling(creep: Creep, patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]) {
    super.patrolling(creep, patrollingCoordinates);
  }

  public spawn(): void {
    const { ROLE_WORKING_ABROAD_ATTACK, LIMIT_WORKING_ABROAD_ATTACK } = this.properties;
    super.spawn(ROLE_WORKING_ABROAD_ATTACK + this.roomNames.join("#"), LIMIT_WORKING_ABROAD_ATTACK as ILimitCreep);
  }
}
