type Entry = {
    id: string;
    title: string;
    content: string;
    tags: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    reactions?:{
        happy: number;
        sad: number;
        angry: number;
        thoughtful: number;
    }
}

export type { Entry };