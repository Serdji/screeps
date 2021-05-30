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

    //   const { ROLE_WORKING_ABROAD_UPGRADER, ROLE_WORKING_ABROAD_HARVESTER, ROLE_WORKING_ABROAD_ATTACK, ROLE_RANGED } = this.properties;
    //
    //   const creepRoleWorkingAbroadUpgraderW7N3 = new CreepRoleWorkingAbroadUpgrader(
    //     "W7N3",
    //     this.nameSpawn,
    //     _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: null, level: 1 })
    //   );
    //
    //   const creepRoleWorkingAbroadUpgraderW8N2 = new CreepRoleWorkingAbroadUpgrader(
    //     "W8N2",
    //     this.nameSpawn,
    //     _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: null, level: 1 })
    //   );
    //
    //   const creepRoleWorkingAbroadHarvesterW7N3 = new CreepRoleWorkingAbroadHarvester(
    //     "W7N3",
    //     this.nameSpawn,
    //     _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: null, level: 1 })
    //   );
    //   const creepRoleWorkingAbroadHarvesterW8N2 = new CreepRoleWorkingAbroadHarvester(
    //     "W8N2",
    //     this.nameSpawn,
    //     _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: null, level: 1 })
    //   );
    //
    //   const creepRoleWorkingAbroadAttackW7N3 = new CreepRoleWorkingAbroadAttack(
    //     "W7N3",
    //     this.nameSpawn,
    //     _.set(this.properties, "LIMIT_WORKING_ABROAD_ATTACK", { size: 2, level: 2 }),
    //     [
    //       [38, 10],
    //       [32, 15],
    //       [35, 22]
    //     ]
    //   );
    //
    //   const creepRoleRanged1 = new CreepRoleRanged("1", this.nameSpawn, this.properties, [34, 11]);
    //   const creepRoleRanged2 = new CreepRoleRanged("2", this.nameSpawn, this.properties, [36, 27]);
    //
    //   for (const name in Game.creeps) {
    //     const creep = Game.creeps[name];
    //     switch (creep.memory.role) {
    //       case ROLE_WORKING_ABROAD_UPGRADER + "W7N3":
    //         creepRoleWorkingAbroadUpgraderW7N3.run(creep);
    //         break;
    //       case ROLE_WORKING_ABROAD_UPGRADER + "W8N2":
    //         creepRoleWorkingAbroadUpgraderW8N2.run(creep);
    //         break;
    //       case ROLE_WORKING_ABROAD_HARVESTER + "W7N3":
    //         creepRoleWorkingAbroadHarvesterW7N3.run(creep);
    //         break;
    //       case ROLE_WORKING_ABROAD_HARVESTER + "W8N2":
    //         creepRoleWorkingAbroadHarvesterW8N2.run(creep);
    //         break;
    //       case ROLE_WORKING_ABROAD_ATTACK + "W7N3":
    //         creepRoleWorkingAbroadAttackW7N3.run(creep);
    //         break;
    //       case ROLE_RANGED + "1":
    //         creepRoleRanged1.run(creep);
    //         break;
    //       case ROLE_RANGED + "2":
    //         creepRoleRanged2.run(creep);
    //         break;
    //     }
    //   }
  }
}
