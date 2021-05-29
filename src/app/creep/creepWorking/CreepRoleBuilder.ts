/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleBuilder');
 * mod.thing == 'a thing'; // true
 */

import { CreepWorking } from "./CreepWorking";

export class CreepRoleBuilder extends CreepWorking {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }

  public run(creep: Creep): void {
    this.toBuilder(creep);
  }

  public toBuilder(creep: Creep) {
    super.toBuilder(creep);
  }

  public spawn(): void {
    const { ROLE_BUILDER, LIMIT_BUILDER_MAX } = this.properties;
    super.spawn(ROLE_BUILDER, LIMIT_BUILDER_MAX);
  }
}
