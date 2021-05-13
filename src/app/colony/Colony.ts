/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Colony');
 * mod.thing == 'a thing'; // true
 */

module.exports = class Colony {
  private nameSpawn: string;
  private optionSpawn: any;


  constructor(nameSpawn: string, optionSpawn: any) {
    this.nameSpawn = nameSpawn;
    this.optionSpawn = optionSpawn;
  }

  /**
   * Метод возвращающей конфигурацию крипсов
   * @returns {*&{ROOM_ENERGY_LIMIT_1300: number, FIT_RANGED_800: *[], ROOM_ENERGY_LIMIT_800: number, SIZE_NAME_CREEP: number, FIT_RANGED_300: *[], FIT_ATTACK_1300: *[], FIT_RANGED_550: *[], FIT_RANGED_1300: *[], ROLE_BUILDER: string, FIT_WORKING_1300: *[], ROLE_WORKING_ABROAD_UPGRADER: string, FIT_ATTACK_800: *[], ROLE_RANGED: string, FIT_WORKING_300: *[], FIT_ATTACK_300: *[], ROLE_HARVESTER: string, FIT_WORKING_550: *[], ROOM_ENERGY_LIMIT_300: number, FIT_ATTACK_550: *[], ROOM_ENERGY_LIMIT_550: number, ROLE_ATTACK: string, ROLE_UPGRADER: string, FIT_WORKING_800: *[]}}
   */
  public getProperties(): any {
    return {
      ...this.optionSpawn,
      SIZE_NAME_CREEP: 10,

      ROLE_HARVESTER: "harvester",
      ROLE_UPGRADER: "upgrader",
      ROLE_BUILDER: "builder",
      ROLE_WORKING_ABROAD_UPGRADER: "multiRoom",
      ROLE_ATTACK: "attack",
      ROLE_RANGED: "ranged",

      ROOM_ENERGY_LIMIT_300: 300,
      ROOM_ENERGY_LIMIT_550: 550,
      ROOM_ENERGY_LIMIT_800: 800,
      ROOM_ENERGY_LIMIT_1300: 1300,

      FIT_WORKING_300: [WORK, CARRY, CARRY, CARRY, MOVE],
      FIT_WORKING_550: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
      FIT_WORKING_800: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
      FIT_WORKING_1300: [
        WORK,
        WORK,
        WORK,
        WORK,
        WORK,
        WORK,
        WORK,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE
      ],

      FIT_ATTACK_300: [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK],
      FIT_ATTACK_550: [
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        MOVE,
        MOVE,
        MOVE,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK
      ],
      FIT_ATTACK_800: [
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK
      ],
      FIT_ATTACK_1300: [
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK,
        ATTACK
      ],

      FIT_RANGED_300: [MOVE, MOVE, MOVE, RANGED_ATTACK],
      FIT_RANGED_550: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
      FIT_RANGED_800: [MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
      FIT_RANGED_1300: [
        MOVE,
        MOVE,
        RANGED_ATTACK,
        RANGED_ATTACK,
        RANGED_ATTACK,
        RANGED_ATTACK,
        RANGED_ATTACK,
        RANGED_ATTACK,
        RANGED_ATTACK,
        RANGED_ATTACK
      ]
    };
  }
};
