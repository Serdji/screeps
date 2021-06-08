import { CreepRoleWorkingAbroadAttack } from "../creep/creepAttack/CreepRoleWorkingAbroadAttack";
import { CreepRoleRanged } from "../creep/creepRanged/CreepRoleRanged";
import { CreepRoleWorkingAbroadHarvester } from "../creep/creepWorking/CreepRoleWorkingAbroadHarvester";
import { CreepRoleWorkingAbroadUpgrader } from "../creep/creepWorking/CreepRoleWorkingAbroadUpgrader";
import { Colony } from "./Colony";

export class ColonySpawnOne extends Colony {
  public constructor(nameSpawn: string, properties: IProperties) {
    super(nameSpawn, properties);
    this.run();
  }

  public run(): void {
    super.run();

    const { ROLE_WORKING_ABROAD_UPGRADER, ROLE_WORKING_ABROAD_HARVESTER, ROLE_WORKING_ABROAD_ATTACK, ROLE_RANGED } =
      this.properties;

    const creepRoleWorkingAbroadUpgraderW38S57 = new CreepRoleWorkingAbroadUpgrader(
      "W38S57",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 2, level: 1 })
    );
    // const creepRoleWorkingAbroadUpgraderW37S58 = new CreepRoleWorkingAbroadUpgrader(
    //   "W37S58",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 2, level: 1 })
    // );
    const creepRoleWorkingAbroadUpgraderW37S56 = new CreepRoleWorkingAbroadUpgrader(
      "W37S56",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 2, level: 1 })
    );

    const creepRoleWorkingAbroadHarvesterW38S57 = new CreepRoleWorkingAbroadHarvester(
      "W38S57",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: 1, level: 2 })
    );
    // const creepRoleWorkingAbroadHarvesterW37S58 = new CreepRoleWorkingAbroadHarvester(
    //   "W37S58",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: 2, level: 1 })
    // );
    const creepRoleWorkingAbroadHarvesterW37S56 = new CreepRoleWorkingAbroadHarvester(
      "W37S56",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: 1, level: 2 })
    );

    //
    //   const creepRoleWorkingAbroadAttackW38S57 = new CreepRoleWorkingAbroadAttack(
    //     "W38S57",
    //     this.nameSpawn,
    //     _.set(this.properties, "LIMIT_WORKING_ABROAD_ATTACK", { size: 2, level: 2 }),
    //     [
    //       [10, 40],
    //       [4, 34],
    //     ]
    //   );
    //
    //   const creepRoleWorkingAbroadAttackW37S58 = new CreepRoleWorkingAbroadAttack(
    //     "W37S58",
    //     this.nameSpawn,
    //     _.set(this.properties, "LIMIT_WORKING_ABROAD_ATTACK", { size: 2, level: 2 }),
    //     [
    //       [34, 22],
    //       [32, 25],
    //       [31, 26],
    //       [33, 31],
    //     ]
    //   );
    //
    //   const creepRoleWorkingAbroadAttackW37S56 = new CreepRoleWorkingAbroadAttack(
    //     "W37S56",
    //     this.nameSpawn,
    //     _.set(this.properties, "LIMIT_WORKING_ABROAD_ATTACK", { size: 2, level: 2 }),
    //     [
    //       [35, 26],
    //       [41, 33],
    //     ]
    //   );
    //
    //   const creepRoleRanged1 = new CreepRoleRanged("1", this.nameSpawn, this.properties, [34, 11]);
    //   const creepRoleRanged2 = new CreepRoleRanged("2", this.nameSpawn, this.properties, [36, 27]);
    //
    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_WORKING_ABROAD_UPGRADER + "W38S57":
          creepRoleWorkingAbroadUpgraderW38S57.run(creep);
          break;
        // case ROLE_WORKING_ABROAD_UPGRADER + "W37S58":
        //   creepRoleWorkingAbroadUpgraderW37S58.run(creep);
        //   break;
        case ROLE_WORKING_ABROAD_UPGRADER + "W37S56":
          creepRoleWorkingAbroadUpgraderW37S56.run(creep);
          break;
        case ROLE_WORKING_ABROAD_HARVESTER + "W38S57":
          creepRoleWorkingAbroadHarvesterW38S57.run(creep);
          break;
        // case ROLE_WORKING_ABROAD_HARVESTER + "W37S58":
        //   creepRoleWorkingAbroadHarvesterW37S58.run(creep);
        //   break;
        case ROLE_WORKING_ABROAD_HARVESTER + "W37S56":
          creepRoleWorkingAbroadHarvesterW37S56.run(creep);
          break;
        // case ROLE_WORKING_ABROAD_ATTACK + "W38S57":
        //   creepRoleWorkingAbroadAttackW38S57.run(creep);
        //   break;
        // case ROLE_WORKING_ABROAD_ATTACK + "W37S58":
        //   creepRoleWorkingAbroadAttackW37S58.run(creep);
        //   break;
        // case ROLE_WORKING_ABROAD_ATTACK + "W37S56":
        //   creepRoleWorkingAbroadAttackW37S56.run(creep);
        //   break;
        // case ROLE_RANGED + "1":
        //   creepRoleRanged1.run(creep);
        //   break;
        // case ROLE_RANGED + "2":
        //   creepRoleRanged2.run(creep);
        //   break;
      }
    }
  }
}
