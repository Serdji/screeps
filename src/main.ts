import { ErrorMapper } from "app/utils/ErrorMapper";

import { properties } from "app/properties";

import { CreepRoleAttack } from "app/creep/CreepRoleAttack";
import { CreepRoleBuilder } from "app/creep/CreepRoleBuilder";
import { CreepRoleHarvester } from "app/creep/CreepRoleHarvester";
import { CreepRoleUpgrader } from "app/creep/CreepRoleUpgrader";
import { CreepRoleWorkingAbroadUpgrader } from "app/creep/CreepRoleWorkingAbroadUpgrader";

import { TowerControl } from "app/tower/TowerControl";
import { CreepRoleWorkingAbroadHarvester } from "./app/creep/CreepRoleWorkingAbroadHarvester";

const { ROLE_HARVESTER, ROLE_BUILDER, ROLE_UPGRADER, ROLE_ATTACK, ROLE_WORKING_ABROAD_UPGRADER, ROLE_WORKING_ABROAD_HARVESTER } = properties;

declare global {
  /**
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    building: boolean;
    harvester: boolean;
    upgrading: boolean;
    role: string;
    room: string;
    working: boolean;
    sourceID: Id<Source> | null;
    roomName: string;
    isForward: boolean;
    counter: number;
    level: number;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
      console.log('Помер крипт и удален из памяти:', name);
    }
  }

  const creepRoleHarvester = new CreepRoleHarvester();
  const creepRoleUpgrader = new CreepRoleUpgrader();
  const creepRoleBuilder = new CreepRoleBuilder();

  const creepRoleWorkingAbroadUpgraderW7N3 = new CreepRoleWorkingAbroadUpgrader("W7N3");
  const creepRoleWorkingAbroadUpgraderW8N2 = new CreepRoleWorkingAbroadUpgrader("W8N2");

  const creepRoleWorkingAbroadHarvesterW7N3 = new CreepRoleWorkingAbroadHarvester("W7N3");
  const creepRoleWorkingAbroadHarvesterW8N2 = new CreepRoleWorkingAbroadHarvester("W8N2");

  const creepRoleAttack = new CreepRoleAttack();

  const towerControl = new TowerControl();

  creepRoleHarvester.spawn();
  creepRoleUpgrader.spawn();
  creepRoleBuilder.spawn();

  creepRoleWorkingAbroadUpgraderW7N3.spawn();
  creepRoleWorkingAbroadUpgraderW8N2.spawn();

  creepRoleWorkingAbroadHarvesterW7N3.spawn();
  creepRoleWorkingAbroadHarvesterW8N2.spawn();

  creepRoleAttack.spawn();

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
      case ROLE_WORKING_ABROAD_UPGRADER + "W7N3":
        creepRoleWorkingAbroadUpgraderW7N3.run(creep);
        break;
      case ROLE_WORKING_ABROAD_UPGRADER + "W8N2":
        creepRoleWorkingAbroadUpgraderW8N2.run(creep);
        break;
      case ROLE_WORKING_ABROAD_HARVESTER + "W7N3":
        creepRoleWorkingAbroadHarvesterW7N3.run(creep);
        break;
      case ROLE_WORKING_ABROAD_HARVESTER + "W8N2":
        creepRoleWorkingAbroadHarvesterW8N2.run(creep);
        break;
      case ROLE_ATTACK:
        creepRoleAttack.run(creep);
        break;
    }
  }
});
