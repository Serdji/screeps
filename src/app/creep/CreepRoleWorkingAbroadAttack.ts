/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleAttack');
 * mod.thing == 'a thing'; // true
 */

import { CreepRole } from "./CreepRole";

export class CreepRoleWorkingAbroadAttack extends CreepRole {
  private roomName: string;
  private patrollingCoordinates: [number, number][];

  public constructor(
    roomName: string,
    nameSpawn: string,
    properties: { [ p: string ]: any },
    patrollingCoordinates: [number, number][]
  ) {
    super(nameSpawn, properties);
    this.roomName = roomName;
    this.patrollingCoordinates = patrollingCoordinates;
    this.spawn();
  }

  public run(creep: Creep): void {
    if (this.roomName !== creep.room.name) {
      const exitDir = Game.map.findExit(creep.room, this.roomName) as ExitConstant;
      const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
      creep.moveTo(exit);
      // Если имена совпали, едем убгрейживать контролер
    } else {
      const hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      const structureInvaderCore = creep.room.find(FIND_HOSTILE_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_INVADER_CORE
      });

      if (hostileCreeps) {
        if (creep.attack(hostileCreeps) === ERR_NOT_IN_RANGE) {
          creep.moveTo(hostileCreeps);
        }
      } else if (structureInvaderCore) {
        if (creep.attack(structureInvaderCore[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structureInvaderCore[0]);
        }
      } else {
        this.patrolling(creep);
      }
    }
  }

  /**
   * Метод для потрулирование атакующих крипсов
   * @param creep
   */
  private patrolling(creep: Creep) {
    (this.patrollingCoordinates as [[number, number]]).forEach(([x, y], i) => {
      if (creep.memory.isForward) {
        if (creep.memory.counter === i) {
          if (creep.pos.x === x && creep.pos.y === y) creep.memory.counter++;
          creep.moveTo(x, y);
        }
        if (creep.memory.counter >= (this.patrollingCoordinates as [[number, number]]).length - 1)
          creep.memory.isForward = false;
      } else {
        if (creep.memory.counter === i) {
          if (creep.pos.x === x && creep.pos.y === y) creep.memory.counter--;
          creep.moveTo(x, y);
          if (creep.memory.counter <= 0) creep.memory.isForward = true;
        }
      }
    });
  }

  public spawn() {
    const { ROLE_WORKING_ABROAD_ATTACK, LIMIT_WORKING_ABROAD_ATTACK } = this.properties;
    super.spawn(ROLE_WORKING_ABROAD_ATTACK, LIMIT_WORKING_ABROAD_ATTACK, this.roomName);
  }
}
