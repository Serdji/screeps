/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Colony');
 * mod.thing == 'a thing'; // true
 */

import { CreepRoleAttack } from "../creep/creepAttack/CreepRoleAttack";
import { CreepRoleBuilder } from "../creep/creepWorking/CreepRoleBuilder";
import { CreepRoleHarvester } from "../creep/creepWorking/CreepRoleHarvester";
import { CreepRoleUpgrader } from "../creep/creepWorking/CreepRoleUpgrader";
import { TowerControl } from "../tower/TowerControl";

export class Colony {
  public nameSpawn: string;
  public properties: IProperties;

  public constructor(nameSpawn: string, properties: IProperties) {
    this.nameSpawn = nameSpawn;
    this.properties = properties;
  }

  public run(): void {
    const { ROLE_HARVESTER, ROLE_UPGRADER, ROLE_BUILDER, ROLE_ATTACK } = this.properties;

    const creepRoleHarvester = new CreepRoleHarvester(this.nameSpawn, this.properties);
    const creepRoleUpgrader = new CreepRoleUpgrader(this.nameSpawn, this.properties);
    const creepRoleBuilder = new CreepRoleBuilder(this.nameSpawn, this.properties);
    const creepRoleAttack = new CreepRoleAttack(this.nameSpawn, this.properties);

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
}
