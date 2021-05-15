import { CreepRoleAttack } from "../creep/CreepRoleAttack";
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

    const { ROLE_WORKING_ABROAD_UPGRADER, ROLE_WORKING_ABROAD_HARVESTER, ROLE_ATTACK } = this.properties;

    const creepRoleAttack = new CreepRoleAttack(this.nameSpawn, this.properties, {
      name: "W7N3",
      isAttack: false
    });

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

    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      switch (creep.memory.role) {
        case ROLE_ATTACK:
          creepRoleAttack.run(creep);
          break;
        case (ROLE_WORKING_ABROAD_UPGRADER as string) + "W7N3":
          creepRoleWorkingAbroadUpgraderW7N3.run(creep);
          break;
        case (ROLE_WORKING_ABROAD_UPGRADER as string) + "W8N2":
          creepRoleWorkingAbroadUpgraderW8N2.run(creep);
          break;
        case (ROLE_WORKING_ABROAD_HARVESTER as string) + "W7N3":
          creepRoleWorkingAbroadHarvesterW7N3.run(creep);
          break;
        case (ROLE_WORKING_ABROAD_HARVESTER as string) + "W8N2":
          creepRoleWorkingAbroadHarvesterW8N2.run(creep);
          break;
      }
    }
  }
}
