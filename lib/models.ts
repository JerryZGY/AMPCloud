export type Project = {
    projectNo?: number;
    createdAt?: Date;
    designs?: Design[];
    machinings?: Machining[];
    moldings?: Molding[];
    logs?: string[];
};

export type Design = {
    projectNo?: string;
    orderNo?: string; // 訂單編號
    moldNo?: string; // 模具編號
    templateNo?: string; // 模具設計樣板
    customerNo?: string; // 客戶編號
    productName?: string; // 品名
    createdAt?: Date; // 訂單時間
    endedAt?: Date; // 完工時間
    event?: string;
    data?: string;
    sentAt: Date; // 更新時間
    percent: number;
};

export type Machining = {
    projectNo?: string;
    machiningNo?: string;
    createdAt?: Date; // 訂單時間
    endedAt?: Date; // 完工時間
    sentAt: Date; // 更新時間
    percent: number;
};

export type Molding = {
    projectNo?: string;
    moldingNo?: string;
    createdAt?: Date; // 訂單時間
    endedAt?: Date; // 完工時間
    sentAt: Date; // 更新時間
    percent: number;
};
