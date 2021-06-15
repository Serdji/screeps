interface IPublicConfig {
  SIZE_NAME_CREEP: number;

  ROLE_HARVESTER: string;
  ROLE_UPGRADER: string;
  ROLE_BUILDER: string;
  ROLE_REFUELLER: string;
  ROLE_REPAIR: string;
  ROLE_WORKING_ABROAD_UPGRADER: string;
  ROLE_WORKING_ABROAD_HARVESTER: string;
  ROLE_WORKING_ABROAD_ATTACK: string;
  ROLE_ATTACK: string;
  ROLE_RANGED: string;
  ROLE_MINER: string;
  ROLE_FILLER: string;
  ROLE_STORAGE: string;
  ROLE_RESERVE: string;
  ROLE_CLIME: string;

  LEVEL_1: number;
  LEVEL_2: number;
  LEVEL_3: number;
  LEVEL_4: number;

  ROOM_ENERGY_LIMIT_300: number;
  ROOM_ENERGY_LIMIT_550: number;
  ROOM_ENERGY_LIMIT_800: number;
  ROOM_ENERGY_LIMIT_1300: number;

  FIT_WORKING_300: BodyPartConstant[];
  FIT_WORKING_550: BodyPartConstant[];
  FIT_WORKING_800: BodyPartConstant[];
  FIT_WORKING_1300: BodyPartConstant[];

  FIT_ATTACK_300: BodyPartConstant[];
  FIT_ATTACK_550: BodyPartConstant[];
  FIT_ATTACK_800: BodyPartConstant[];
  FIT_ATTACK_1300: BodyPartConstant[];

  FIT_RANGED_300: BodyPartConstant[];
  FIT_RANGED_550: BodyPartConstant[];
  FIT_RANGED_800: BodyPartConstant[];
  FIT_RANGED_1300: BodyPartConstant[];

  FIT_MINER_300: BodyPartConstant[];
  FIT_MINER_550: BodyPartConstant[];
  FIT_MINER_800: BodyPartConstant[];
  FIT_MINER_1300: BodyPartConstant[];

  FIT_LOADER_300: BodyPartConstant[];
  FIT_LOADER_550: BodyPartConstant[];
  FIT_LOADER_800: BodyPartConstant[];
  FIT_LOADER_1300: BodyPartConstant[];

  FIT_CLAIM_800: BodyPartConstant[];
  FIT_CLAIM_1300: BodyPartConstant[];
}
