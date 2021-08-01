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
import { CreepRoleClime } from "../creep/creepClime/CreepRoleClime";
import { CreepRoleReserve } from "../creep/creepClime/CreepRoleReserve";
import { CreepRoleFiller } from "../creep/creepLoader/CreepRoleFiller";
import { CreepRoleStorage } from "../creep/creepLoader/CreepRoleStorage";
import { CreepRoleMiner } from "../creep/creepMiner/CreepRoleMiner";
import { CreepRoleRanged } from "../creep/creepRanged/CreepRoleRanged";
import { CreepRoleBuilder } from "../creep/creepWorking/CreepRoleBuilder";
import { CreepRoleHarvester } from "../creep/creepWorking/CreepRoleHarvester";
import { CreepRoleRefueller } from "../creep/creepWorking/CreepRoleRefueller";
import { CreepRoleRepair } from "../creep/creepWorking/CreepRoleRepair";
import { CreepRoleUpgrader } from "../creep/creepWorking/CreepRoleUpgrader";
import { CreepRoleWorkingAbroadBuilder } from "../creep/creepWorking/CreepRoleWorkingAbroadBuilder";
import { CreepRoleWorkingAbroadHarvester } from "../creep/creepWorking/CreepRoleWorkingAbroadHarvester";
import { CreepRoleWorkingAbroadUpgrader } from "../creep/creepWorking/CreepRoleWorkingAbroadUpgrader";
import { TowerControl } from "../tower/TowerControl";

export abstract class Colony {
  public run(properties: IProperties): void {}

  public spawnCreepRoleHarvester(nameSpawn: string, properties: IProperties) {
    const { ROLE_HARVESTER } = properties;
    const creepRoleHarvester = new CreepRoleHarvester(nameSpawn, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_HARVESTER:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleHarvester.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleUpgrader(nameSpawn: string, properties: IProperties) {
    const { ROLE_UPGRADER } = properties;
    const creepRoleUpgrader = new CreepRoleUpgrader(nameSpawn, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_UPGRADER:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleUpgrader.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleBuilder(nameSpawn: string, properties: IProperties) {
    const { ROLE_BUILDER } = properties;
    const creepRoleBuilder = new CreepRoleBuilder(nameSpawn, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_BUILDER:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleBuilder.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleRefueller(nameSpawn: string, properties: IProperties) {
    const { ROLE_REFUELLER } = properties;
    const creepRoleRefueller = new CreepRoleRefueller(nameSpawn, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_REFUELLER:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleRefueller.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleFiller(nameSpawn: string, properties: IProperties) {
    const { ROLE_FILLER, FILLER_CONTAINER_ID } = properties;
    const creepRoleFiller = new CreepRoleFiller(nameSpawn, properties, FILLER_CONTAINER_ID);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_FILLER:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleFiller.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleRepair(nameSpawn: string, properties: IProperties) {
    const { ROLE_REPAIR } = properties;
    const creepRoleRepair = new CreepRoleRepair(nameSpawn, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_REPAIR:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleRepair.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleStorage(nameSpawn: string, properties: IProperties): void {
    const { ROLE_STORAGE } = properties;
    const creepRoleStorage = new CreepRoleStorage(nameSpawn, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_STORAGE:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleStorage.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleAttack(nameSpawn: string, properties: IProperties) {
    const { ROLE_ATTACK } = properties;
    const creepRoleAttack = new CreepRoleAttack(nameSpawn, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_ATTACK:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleAttack.run(creep);
          break;
      }
    }
  }

  public spawnWorkingAbroadHarvester(
    roomName: string,
    nameSpawn: string,
    properties: IProperties,
    roomToHome: string
  ): void {
    const { ROLE_WORKING_ABROAD_HARVESTER } = properties;
    const creepRoleWorkingAbroadHarvester = new CreepRoleWorkingAbroadHarvester(
      roomName,
      nameSpawn,
      properties,
      roomToHome
    );
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_WORKING_ABROAD_HARVESTER + roomName:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleWorkingAbroadHarvester.run(creep);
          break;
      }
    }
  }

  public spawnWorkingAbroadUpgrader(
    roomName: string,
    nameSpawn: string,
    properties: IProperties,
    roomToHome: string
  ): void {
    const { ROLE_WORKING_ABROAD_UPGRADER } = properties;
    const creepRoleWorkingAbroadUpgrader = new CreepRoleWorkingAbroadUpgrader(
      roomName,
      nameSpawn,
      properties,
      roomToHome
    );
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_WORKING_ABROAD_UPGRADER + roomName:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleWorkingAbroadUpgrader.run(creep);
          break;
      }
    }
  }
  public spawnWorkingAbroadBuilder(
    roomName: string,
    nameSpawn: string,
    properties: IProperties,
    roomToHome: string
  ): void {
    const { ROLE_WORKING_ABROAD_BUILDER } = properties;
    const creepRoleWorkingAbroadBuilder = new CreepRoleWorkingAbroadBuilder(
      roomName,
      nameSpawn,
      properties,
      roomToHome
    );
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_WORKING_ABROAD_BUILDER + roomName:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleWorkingAbroadBuilder.run(creep);
          break;
      }
    }
  }

  public spawnWorkingAbroadAttack(
    roomName: string,
    nameSpawn: string,
    properties: IProperties,
    patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]
  ): void {
    const { ROLE_WORKING_ABROAD_ATTACK } = properties;
    const creepRoleWorkingAbroadAttack = new CreepRoleWorkingAbroadAttack(
      roomName,
      nameSpawn,
      properties,
      patrollingCoordinates
    );
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_WORKING_ABROAD_ATTACK + roomName:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleWorkingAbroadAttack.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleReserve(roomName: string, nameSpawn: string, properties: IProperties): void {
    const { ROLE_RESERVE } = properties;
    const creepRoleReserve = new CreepRoleReserve(roomName, nameSpawn, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_RESERVE + roomName:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleReserve.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleClime(roomName: string, nameSpawn: string, properties: IProperties): void {
    const { ROLE_CLIME } = properties;
    const creepRoleClime = new CreepRoleClime(roomName, nameSpawn, properties);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_CLIME + roomName:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleClime.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleRanged(suffixName: string, nameSpawn: string, properties: IProperties, rampartId: string): void {
    const { ROLE_RANGED } = properties;
    const creepRoleRanged = new CreepRoleRanged(suffixName, nameSpawn, properties, rampartId);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_RANGED + suffixName:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleRanged.run(creep);
          break;
      }
    }
  }

  public spawnCreepRoleMiner(
    suffixName: string,
    nameSpawn: string,
    properties: IProperties,
    containerId: string
  ): void {
    const { ROLE_MINER } = properties;
    const creepRoleMiner = new CreepRoleMiner(suffixName, nameSpawn, properties, containerId);
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_MINER + suffixName:
          if (creep.memory.nameSpawn === nameSpawn) creepRoleMiner.run(creep);
          break;
      }
    }
  }
}
