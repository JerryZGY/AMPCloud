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
    projectEvent?: string; // 事件內容
    orderNo?: string; // 訂單編號
    moldNo?: string; // 模具編號
    templateNo?: string; // 模具設計樣板
    customerNo?: string; // 客戶編號
    productName?: string; // 品名
    createdAt?: Date; // 訂單時間
    endedAt?: Date; // 完工時間
    data?: string;
    sentAt: Date; // 更新時間
    percent: number;
    states: DesignStates;
};

export type DesignStates = {
    MS_Create: string;          // 模型建立
    MS_Surface_Design: string;  // 分模面設計
    MB_Create: string;          // 模座建立
    MB_Detail: string;     // 模座細部設計
    MS_Detail: string;     // 機構細部設計
    MB_Total_Asm: string;     // 總組立
    MB_Asm_Figure: string;     // 組立圖
    MB_Com_Figure: string;     // 零件圖
}

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
