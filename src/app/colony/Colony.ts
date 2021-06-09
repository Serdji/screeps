/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Colony');
 * mod.thing == 'a thing'; // true
 */

import { CreepRoleAttack } from "../creep/creepAttack/CreepRoleAttack";
import { CreepRoleWorkingAbroadAttack } from "../creep/creepAttack/CreepRoleWorkingAbroadAttack";
import { CreepRoleRanged } from "../creep/creepRanged/CreepRoleRanged";
import { CreepRoleBuilder } from "../creep/creepWorking/CreepRoleBuilder";
import { CreepRoleHarvester } from "../creep/creepWorking/CreepRoleHarvester";
import { CreepRoleRefueller } from "../creep/creepWorking/CreepRoleRefueller";
import { CreepRoleRepair } from "../creep/creepWorking/CreepRoleRepair";
import { CreepRoleUpgrader } from "../creep/creepWorking/CreepRoleUpgrader";
import { CreepRoleWorkingAbroadHarvester } from "../creep/creepWorking/CreepRoleWorkingAbroadHarvester";
import { CreepRoleWorkingAbroadUpgrader } from "../creep/creepWorking/CreepRoleWorkingAbroadUpgrader";
import { TowerControl } from "../tower/TowerControl";

export class Colony {
  public nameSpawn: string;
  public properties: IProperties;

  public constructor(nameSpawn: string, properties: IProperties) {
    this.nameSpawn = nameSpawn;
    this.properties = properties;
  }

  public run(): void {
    const { ROLE_HARVESTER, ROLE_UPGRADER, ROLE_BUILDER, ROLE_REFUELLER, ROLE_REPAIR, ROLE_ATTACK } = this.properties;

    const creepRoleHarvester = new CreepRoleHarvester(this.nameSpawn, this.properties);
    const creepRoleUpgrader = new CreepRoleUpgrader(this.nameSpawn, this.properties);
    const creepRoleBuilder = new CreepRoleBuilder(this.nameSpawn, this.properties);
    const creepRoleRefueller = new CreepRoleRefueller(this.nameSpawn, this.properties);
    const creepRoleRepair = new CreepRoleRepair(this.nameSpawn, this.properties);
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
        case ROLE_REFUELLER:
          creepRoleRefueller.run(creep);
          break;
        case ROLE_REPAIR:
          creepRoleRepair.run(creep);
          break;
        case ROLE_ATTACK:
          creepRoleAttack.run(creep);
          break;
      }
    }
  }

  public spawnWorkingAbroadHarvester(roomName: string, spawnName: string, properties: IProperties): void {
    const { ROLE_WORKING_ABROAD_HARVESTER } = properties;
    const creepRoleWorkingAbroadHarvester = new CreepRoleWorkingAbroadHarvester(roomName, spawnName, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_WORKING_ABROAD_HARVESTER + roomName:
          creepRoleWorkingAbroadHarvester.run(creep);
          break;
      }
    }
  }

  public spawnWorkingAbroadUpgrader(roomName: string, spawnName: string, properties: IProperties): void {
    const { ROLE_WORKING_ABROAD_UPGRADER } = properties;
    const creepRoleWorkingAbroadUpgrader = new CreepRoleWorkingAbroadUpgrader(roomName, spawnName, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_WORKING_ABROAD_UPGRADER + roomName:
          creepRoleWorkingAbroadUpgrader.run(creep);
          break;
      }
    }
  }

  public spawnWorkingAbroadAttack(
    roomName: string,
    spawnName: string,
    properties: IProperties,
    patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]
  ): void {
    const { ROLE_WORKING_ABROAD_ATTACK } = properties;
    const creepRoleWorkingAbroadAttack = new CreepRoleWorkingAbroadAttack(
      roomName,
      spawnName,
      properties,
      patrollingCoordinates
    );
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_WORKING_ABROAD_ATTACK + roomName:
          creepRoleWorkingAbroadAttack.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleRanged(
    suffixName: string,
    nameSpawn: string,
    properties: IProperties,
    parkingCoordinates: [number, number]
  ): void {
    const { ROLE_RANGED } = properties;
    const creepRoleRanged = new CreepRoleRanged("1", this.nameSpawn, this.properties, [34, 11]);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_RANGED + suffixName:
          creepRoleRanged.run(creep);
          break;
      }
    }
  }
}
