export type Project = {
    _id: string;
    projectNo: string; // 161200011M
    projectEvent?: string;
    logs: string[];
    design?: Design;
    designHistory?: Design[];
    machinings?: Machining[];
    moldings?: Molding[];
    createdAt: Date;
};

export type Design = {
    projectNo?: string;     // 專案編號 (來自ERP並擷取 - 161200011M)
    projectEvent?: string;  // 事件內容 (Design start|middle|end)
    data?: string;          // 詳細資料
    progress?: number;      // 完成進度
    status?: 'running' | 'error';        // 流程狀態
    subStatus?: SubStatus;  // 子流程狀態
    updatedAt: Date;         // 更新時間
    // ===傳送至子一資料===
    orderNo?: string;       // 訂單編號 (來自ERP - 2Y004-16120001)
    templateNo?: string;    // 模具樣板 (暫時固定為 - 1)
    customerNo?: string;    // 客戶編號 (來自ERP - ABCORP)
    productName?: string;   // 產品名稱 (來自ERP - 模具)
    orderDate?: Date;       // 訂單時間 (來自ERP - 2016-12-20)
    deadlineDate?: Date;    // 完工時間 (來自ERP - 2017-01-16)
    // ==================
};

export type SubStatus = {
    MS_Create: StateString;          // 模型建立
    MS_Surface_Design: StateString;  // 分模面設計
    MB_Create: StateString;          // 模座建立
    MB_Detail: StateString;          // 模座細部設計
    MS_Detail: StateString;          // 機構細部設計
    MB_Total_Asm: StateString;       // 總組立
    MB_Asm_Figure: StateString;      // 組立圖
    MB_Com_Figure: StateString;      // 零件圖
};

type StateString = 'standby' | 'running' | 'done' | 'greeze' | 'error';

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
