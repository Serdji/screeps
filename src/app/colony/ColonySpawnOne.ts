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

  public spawnWorkingAbroadHarvester(roomName: string, spawnName: string, properties: IProperties) {
    super.spawnWorkingAbroadHarvester(roomName, spawnName, properties);
  }

  public spawnWorkingAbroadUpgrader(roomName: string, spawnName: string, properties: IProperties) {
    super.spawnWorkingAbroadUpgrader(roomName, spawnName, properties);
  }

  public spawnWorkingAbroadAttack(
    roomName: string,
    spawnName: string,
    properties: IProperties,
    patrollingCoordinates: IProperties["PATROLLING_COORDINATES"]
  ) {
    super.spawnWorkingAbroadAttack(roomName, spawnName, properties, patrollingCoordinates);
  }

  public spawnCreepRoleRanged(
    suffixName: string,
    nameSpawn: string,
    properties: IProperties,
    parkingCoordinates: [number, number]
  ) {
    super.spawnCreepRoleRanged(suffixName, nameSpawn, properties, parkingCoordinates);
  }
}
