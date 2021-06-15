interface IPrivateConfig {
  LIMIT_HARVESTER: ILimitCreep;
  LIMIT_UPGRADER: ILimitCreep;
  LIMIT_BUILDER: ILimitCreep;
  LIMIT_REFUELLER: ILimitCreep;
  LIMIT_REPAIR: ILimitCreep;
  LIMIT_MINER: ILimitCreep;
  LIMIT_FILLER: ILimitCreep;
  LIMIT_STORAGE: ILimitCreep;

  LIMIT_RESERVE?: ILimitCreep;
  LIMIT_CLIME?: ILimitCreep;
  LIMIT_WORKING_ABROAD_UPGRADER?: ILimitCreep;
  LIMIT_WORKING_ABROAD_HARVESTER?: ILimitCreep;
  LIMIT_WORKING_ABROAD_ATTACK?: ILimitCreep;

  LIMIT_ATTACK: ILimitCreep;
  LIMIT_RANGED: ILimitCreep;

  HITS_MAX: number;

  PATROLLING_COORDINATES: [number, number][];
  STORAGE_CONTAINER_IDS: string[];
  FILLER_CONTAINER_ID: string;
}
