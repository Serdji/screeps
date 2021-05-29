/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleUpgrader');
 * mod.thing == 'a thing'; // true
 */
import { CreepWorking } from "./CreepWorking";

export class CreepRoleUpgrader extends CreepWorking {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }

  public run(creep: Creep): void {
    this.toUpgrader(creep);
  }

  public toUpgrader(creep: Creep) {
    super.toUpgrader(creep);
  }

  public spawn(): void {
    const { ROLE_UPGRADER, LIMIT_UPGRADER_MAX } = this.properties;
    super.spawn(ROLE_UPGRADER, LIMIT_UPGRADER_MAX);
  }
}
