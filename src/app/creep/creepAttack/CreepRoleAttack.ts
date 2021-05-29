/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepRoleAttack');
 * mod.thing == 'a thing'; // true
 */
import { CreepAttack } from "./CreepAttack";

export class CreepRoleAttack extends CreepAttack {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.spawn();
  }

  public run(creep: Creep): void {
    if (!this.toAttack(creep)) {
      const { PATROLLING_COORDINATES } = this.properties;
      this.patrolling(creep, PATROLLING_COORDINATES);
    }
  }

  public toAttack(creep: Creep): boolean {
    return super.toAttack(creep);
  }

  public patrolling(creep: Creep, patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]) {
    super.patrolling(creep, patrollingCoordinates);
  }

  public spawn() {
    const { ROLE_ATTACK, LIMIT_ATTACK_MAX } = this.properties;
    super.spawn(ROLE_ATTACK, LIMIT_ATTACK_MAX);
  }
}
