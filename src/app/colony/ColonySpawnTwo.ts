import { Colony } from "./Colony";

export class ColonySpawnTwo extends Colony {
  private nameSpawn: string;
  private properties: IProperties;

  public constructor(nameSpawn: string, properties: IProperties) {
    super();
    this.nameSpawn = nameSpawn;
    this.properties = properties;
    this.run();
  }

  public run(): void {
    super.run(this.properties);
    this.runWorkingColony();
    this.runWorkingAbroad();
  }

  private runWorkingColony() {
    this.spawnCreepRoleHarvester(this.nameSpawn, this.properties);
    this.spawnCreepRoleUpgrader(this.nameSpawn, this.properties);
    this.spawnCreepRoleBuilder(this.nameSpawn, this.properties);
    this.spawnCreepRoleRefueller(this.nameSpawn, this.properties);
    this.spawnCreepRoleRepair(this.nameSpawn, this.properties);
    this.spawnCreepRoleAttack(this.nameSpawn, this.properties);
    this.spawnCreepRoleStorage(this.nameSpawn, this.properties);
    this.spawnCreepRoleFiller(this.nameSpawn, this.properties);

    this.spawnCreepRoleMiner("1", this.nameSpawn, this.properties, "60e32f504bb9d22adecb1212");
    // this.spawnCreepRoleMiner("2", this.nameSpawn, this.properties, "60d1e044ee99d3beb752d371");
    //
    // this.spawnCreepRoleRanged("1", this.nameSpawn, this.properties, "60d217a62fd8f7c58ef12f02");
    // this.spawnCreepRoleRanged("2", this.nameSpawn, this.properties, "60d21990887cd55b37e5024a");
  }

  private runWorkingAbroad() {

    // this.spawnWorkingAbroadUpgrader(
    //   "W42S51",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 3, level: 1 })
    // );
    //
    // this.spawnWorkingAbroadUpgrader(
    //   "W42S52",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: null, level: 1 })
    // );

    this.spawnWorkingAbroadHarvester(
      "W42S52",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: null, level: 1 })
    );
    //
    // this.spawnWorkingAbroadUpgrader(
    //   "W42S53",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_WORKING_ABROAD_UPGRADER", { size: 1, level: 1 })
    // );

    this.spawnWorkingAbroadHarvester(
      "W42S53",
      this.nameSpawn,
      _.set(this.properties, "LIMIT_WORKING_ABROAD_HARVESTER", { size: null, level: 1 })
    );

    // this.spawnWorkingAbroadAttack(
    //   "W7N3",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_WORKING_ABROAD_ATTACK", { size: 1, level: 1 }),
    //   [
    //     [36, 12],
    //     [33, 16],
    //     [37, 22]
    //   ]
    // );

    // this.spawnCreepRoleClime(
    //   "W42S51",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_CLIME", { size: 1, level: 2 })
    // );

    // this.spawnCreepRoleReserve(
    //   "W42S52",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_RESERVE", { size: 1, level: 1 })
    // );
    // this.spawnCreepRoleReserve(
    //   "W42S53",
    //   this.nameSpawn,
    //   _.set(this.properties, "LIMIT_RESERVE", { size: 1, level: 1 })
    // );
  }

  public spawnCreepRoleHarvester(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleHarvester(nameSpawn, properties);
  }

  public spawnCreepRoleUpgrader(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleUpgrader(nameSpawn, properties);
  }

  public spawnCreepRoleBuilder(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleBuilder(nameSpawn, properties);
  }

  public spawnCreepRoleRefueller(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleRefueller(nameSpawn, properties);
  }

  public spawnCreepRoleFiller(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleFiller(nameSpawn, properties);
  }

  public spawnCreepRoleRepair(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleRepair(nameSpawn, properties);
  }

  public spawnCreepRoleStorage(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleStorage(nameSpawn, properties);
  }

  public spawnCreepRoleAttack(nameSpawn: string, properties: IProperties) {
    super.spawnCreepRoleAttack(nameSpawn, properties);
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

  public spawnCreepRoleClime(roomName: string, spawnName: string, properties: IProperties) {
    super.spawnCreepRoleClime(roomName, spawnName, properties);
  }

  public spawnCreepRoleReserve(roomName: string, spawnName: string, properties: IProperties) {
    super.spawnCreepRoleReserve(roomName, spawnName, properties);
  }

  public spawnCreepRoleRanged(suffixName: string, nameSpawn: string, properties: IProperties, rampartId: string) {
    super.spawnCreepRoleRanged(suffixName, nameSpawn, properties, rampartId);
  }

  public spawnCreepRoleMiner(suffixName: string, nameSpawn: string, properties: IProperties, containerId: string) {
    super.spawnCreepRoleMiner(suffixName, nameSpawn, properties, containerId);
  }
}
