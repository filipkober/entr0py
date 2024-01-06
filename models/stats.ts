import { Prisma } from "@prisma/client";

export type LevelStatsType = {
    level_index: number;
    levelName: string;
    numCompleted: number;
    numIncomplete: number;
    avgTime: number;
    avgTipsUsed: number;
}
const levelVal = Prisma.validator<Prisma.LevelDefaultArgs>()({})

export type Level = Prisma.LevelGetPayload<typeof levelVal>
export function statsFromLevels(levels: Level[]): LevelStatsType[] {
    let levelStats: LevelStatsType[] = [];
    levels.forEach((level) => {
        const level_index = level.level_index;
        const levelName = level.name;
        let levelFromList = levelStats.find((level) => level.level_index === level_index);
        if(!levelFromList) {
            levelFromList = {
                level_index,
                levelName,
                numCompleted: level.completed ? 1 : 0,
                numIncomplete: level.completed ? 0 : 1,
                avgTime: level.timeTaken,
                avgTipsUsed: level.hintsUsed
            }
            levelStats.push(levelFromList);
        }
        else {
            levelFromList.numCompleted += level.completed ? 1 : 0;
            levelFromList.numIncomplete += level.completed ? 0 : 1;
            levelFromList.avgTime += level.timeTaken;
            levelFromList.avgTipsUsed += level.hintsUsed;
        }
    });
    return levelStats;
}