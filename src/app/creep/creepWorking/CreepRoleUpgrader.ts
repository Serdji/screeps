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
    const { FILLER_CONTAINER_ID } = this.properties;
    this.toUpgrader(creep, FILLER_CONTAINER_ID);
  }

  public toUpgrader(creep: Creep, containerId: string) {
    super.toUpgrader(creep, containerId);
  }

  public spawn(): void {
    const { ROLE_UPGRADER, LIMIT_UPGRADER } = this.properties;
    super.spawn(ROLE_UPGRADER, LIMIT_UPGRADER);
  }
}
