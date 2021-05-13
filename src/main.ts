import { ErrorMapper } from "app/utils/ErrorMapper";

import { properties } from "app/properties";

import { CreepRoleAttack } from "app/creep/CreepRoleAttack";
import { CreepRoleBuilder } from "app/creep/CreepRoleBuilder";
import { CreepRoleHarvester } from "app/creep/CreepRoleHarvester";
import { CreepRoleUpgrader } from "app/creep/CreepRoleUpgrader";
import { CreepRoleMultiRoom } from "app/creep/CreepRoleMultiRoom";

import { TowerControl } from "app/tower/TowerControl";

const { ROLE_HARVESTER, ROLE_BUILDER, ROLE_UPGRADER, ROLE_ATTACK, ROLE_MULTI_ROOM } = properties;

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
    sourceIndex: number | null;
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
  console.log(`Current game tick is ${Game.time}`);

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
  const creepRoleMultiRoomW7N3 = new CreepRoleMultiRoom("W7N3");
  const creepRoleMultiRoomW8N2 = new CreepRoleMultiRoom("W8N2");

  const creepRoleAttack = new CreepRoleAttack();

  const towerControl = new TowerControl();

  creepRoleHarvester.spawn();
  creepRoleUpgrader.spawn();
  creepRoleBuilder.spawn();
  creepRoleMultiRoomW7N3.spawn();
  creepRoleMultiRoomW8N2.spawn();

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
      case ROLE_MULTI_ROOM + "W7N3":
        creepRoleMultiRoomW7N3.run(creep);
        break;
      case ROLE_MULTI_ROOM + "W8N2":
        creepRoleMultiRoomW8N2.run(creep);
        break;
      case ROLE_ATTACK:
        creepRoleAttack.run(creep);
        break;
    }
  }
});
