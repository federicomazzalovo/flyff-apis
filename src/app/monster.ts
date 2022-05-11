import { MonsterName } from "./monsterName";

export interface Monster {
    id: number;
    name: MonsterName;
    icon: string;
    level: number;
}