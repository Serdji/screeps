import { CreepRoleWorkingAbroadAttack } from "../creep/CreepRoleWorkingAbroadAttack";
import { CreepRoleWorkingAbroadHarvester } from "../creep/CreepRoleWorkingAbroadHarvester";
import { CreepRoleWorkingAbroadUpgrader } from "../creep/CreepRoleWorkingAbroadUpgrader";
import { Colony } from "./Colony";

export class ColonySpawnOne extends Colony {
  public constructor(nameSpawn: string, properties: { [ket: string]: any }) {
    super(nameSpawn, properties);
    this.run();
  }

  public run(): void {
    super.run();

    const { ROLE_WORKING_ABROAD_UPGRADER, ROLE_WORKING_ABROAD_HARVESTER, ROLE_WORKING_ABROAD_ATTACK } = this.properties;

    const creepRoleWorkingAbroadUpgraderW7N3 = new CreepRoleWorkingAbroadUpgrader(
      "W7N3",
      this.nameSpawn,
      this.properties
    );

    const creepRoleWorkingAbroadUpgraderW8N2 = new CreepRoleWorkingAbroadUpgrader(
      "W8N2",
      this.nameSpawn,
      this.properties
    );

    const creepRoleWorkingAbroadHarvesterW7N3 = new CreepRoleWorkingAbroadHarvester(
      "W7N3",
      this.nameSpawn,
      this.properties
    );
    const creepRoleWorkingAbroadHarvesterW8N2 = new CreepRoleWorkingAbroadHarvester(
      "W8N2",
      this.nameSpawn,
      this.properties
    );

    const creepRoleWorkingAbroadAttackW7N3 = new CreepRoleWorkingAbroadAttack(
      "W7N3",
      this.nameSpawn,
      this.properties,
      [ [ 15, 15 ], [ 30, 10 ], [ 40, 10 ] ]
    );
    const creepRoleWorkingAbroadAttackW8N2 = new CreepRoleWorkingAbroadAttack(
      "W8N2",
      this.nameSpawn,
      this.properties,
      [ [19, 2 ], [ 19, 31 ], [ 10, 40 ] ]
    );

    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_WORKING_ABROAD_UPGRADER:
          if (_.includes(creep.name, "W7N3")) creepRoleWorkingAbroadUpgraderW7N3.run(creep);
          if (_.includes(creep.name, "W8N2")) creepRoleWorkingAbroadUpgraderW8N2.run(creep);
          break;
        case ROLE_WORKING_ABROAD_HARVESTER:
          if (_.includes(creep.name, "W7N3")) creepRoleWorkingAbroadHarvesterW7N3.run(creep);
          if (_.includes(creep.name, "W8N2")) creepRoleWorkingAbroadHarvesterW8N2.run(creep);
          break;
        case ROLE_WORKING_ABROAD_ATTACK:
          if (_.includes(creep.name, "W7N3")) creepRoleWorkingAbroadAttackW7N3.run(creep);
          if (_.includes(creep.name, "W8N2")) creepRoleWorkingAbroadAttackW8N2.run(creep);
          break;
      }
    }
  }
}
