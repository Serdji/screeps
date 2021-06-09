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

    this.spawnWorkingAbroadHarvester(
      "W38S57",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: 2, level: 1 })
    );

    this.spawnWorkingAbroadUpgrader(
      "W38S57",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 2, level: 1 })
    );
    //   this.spawnWorkingAbroadAttack(
    //     "W37S56",
    //     this.nameSpawn,
    //     _.set(this.properties, "LIMIT_WORKING_ABROAD_ATTACK", { size: 2, level: 2 }),
    //     [
    //       [35, 26],
    //       [41, 33],
    //     ]
    //   );
    //
    //   this.spawnCreepRoleRanged("1", this.nameSpawn, this.properties, [34, 11]);
    //
  }

  private spawnWorkingAbroadHarvester(roomName: string, spawnName: string, properties: IProperties): void {
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

  private spawnWorkingAbroadUpgrader(roomName: string, spawnName: string, properties: IProperties): void {
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

  private spawnWorkingAbroadAttack(
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

  private spawnCreepRoleRanged(
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
