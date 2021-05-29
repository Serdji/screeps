/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepHarvester');
 * mod.thing == 'a thing'; // true
 */
import { CreepWorking } from "./CreepWorking";

export class CreepRoleHarvester extends CreepWorking {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }

  public run(creep: Creep) {
    this.toHarvester(creep);
  }

  public toHarvester(creep: Creep) {
    super.toHarvester(creep);
  }

  public spawn() {
    const { ROLE_HARVESTER, LIMIT_HARVESTER_MAX } = this.properties;
    super.spawn(ROLE_HARVESTER, LIMIT_HARVESTER_MAX);
  }
}
