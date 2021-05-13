/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Colony');
 * mod.thing == 'a thing'; // true
 */

import { CreepRoleAttack } from "../creep/CreepRoleAttack";
import { CreepRoleBuilder } from "../creep/CreepRoleBuilder";
import { CreepRoleHarvester } from "../creep/CreepRoleHarvester";
import { CreepRoleUpgrader } from "../creep/CreepRoleUpgrader";
import { TowerControl } from "../tower/TowerControl";

export class Colony {
  public nameSpawn: string;
  public configSpawn: { [ket: string]: any };

  public constructor(nameSpawn: string, configSpawn: { [ket: string]: any }) {
    this.nameSpawn = nameSpawn;
    this.configSpawn = configSpawn;
  }

  public run(): void {
    const { ROLE_HARVESTER, ROLE_UPGRADER, ROLE_BUILDER, ROLE_ATTACK } = this.getProperties();

    const creepRoleHarvester = new CreepRoleHarvester(this.nameSpawn, this.getProperties());
    const creepRoleUpgrader = new CreepRoleUpgrader(this.nameSpawn, this.getProperties());
    const creepRoleBuilder = new CreepRoleBuilder(this.nameSpawn, this.getProperties());
    const creepRoleAttack = new CreepRoleAttack(this.nameSpawn, this.getProperties());

    const towerControl = new TowerControl();
    towerControl.run();

    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_HARVESTER:
          creepRoleHarvester.run(creep);
          break;
        case ROLE_UPGRADER:
          creepRoleUpgrader.run(creep);
          break;
        case ROLE_BUILDER:
          creepRoleBuilder.run(creep);
          break;
        case ROLE_ATTACK:
          creepRoleAttack.run(creep);
          break;
      }
    }
  }
  public getProperties(): { [key: string]: any } {
    return {
      ...this.configSpawn,

      SIZE_NAME_CREEP: 10,

      ROLE_HARVESTER: "harvester",
      ROLE_UPGRADER: "upgrader",
      ROLE_BUILDER: "builder",
      ROLE_WORKING_ABROAD_UPGRADER: "workingAbroadUpgrader",
      ROLE_WORKING_ABROAD_HARVESTER: "workingAbroadHarvester",
      ROLE_ATTACK: "attack",
      ROLE_RANGED: "ranged",

      LEVEL_1: 1,
      LEVEL_2: 2,
      LEVEL_3: 3,
      LEVEL_4: 4,

      ROOM_ENERGY_LIMIT_300: 300,
      ROOM_ENERGY_LIMIT_550: 550,
      ROOM_ENERGY_LIMIT_800: 800,
      ROOM_ENERGY_LIMIT_1300: 1300,

      FIT_WORKING_300: [WORK, CARRY, CARRY, CARRY, MOVE],
      FIT_WORKING_550: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
      FIT_WORKING_800: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
      FIT_WORKING_1300: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],

      FIT_ATTACK_300: [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK],
      FIT_ATTACK_550: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK],
      FIT_ATTACK_800: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK],
      FIT_ATTACK_1300: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,  ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK],

      FIT_RANGED_300: [MOVE, MOVE, MOVE, RANGED_ATTACK],
      FIT_RANGED_550: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
      FIT_RANGED_800: [MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
      FIT_RANGED_1300: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK ],
    }
  }
}
