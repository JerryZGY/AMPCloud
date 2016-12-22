export type Project = {
    _id: string;
    projectNo: string; // 161200011M
    projectEvent?: string;
    logs: string[];
    design?: Design;
    designHistory?: Design[];
    machinings?: Machining;
    machiningsHistory?: Machining[];
    moldings?: Molding;
    moldingsHistory?: Molding[];
    createdAt: Date;
};

export type Design = {
    // ======共通資料======
    projectNo?: string;     // 專案編號 (來自ERP並擷取 - 161200011M)
    projectEvent?: string;  // 事件內容 (Design start|middle|end)
    progress?: number;      // 完成進度
    updatedAt: Date;         // 更新時間
    // ======取得資料======
    data?: string;          // 詳細資料
    status?: 'running' | 'error';        // 流程狀態
    subStatus?: SubStatus;  // 子流程狀態
    // ======傳送資料======
    orderNo: string;       // 訂單編號 (來自ERP - 2Y004-16120001)
    templateNo: string;    // 模具樣板 (暫時固定為 - 1)
    customerNo: string;    // 客戶編號 (來自ERP - ABCORP)
    productName: string;   // 產品名稱 (來自ERP - 模具)
    orderDate: Date;       // 訂單時間 (來自ERP - 2016-12-20)
    deadlineDate: Date;    // 完工時間 (來自ERP - 2017-01-16)
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

type StateString = 'standby' | 'running' | 'done' | 'freeze' | 'error';

export type Machining = {
    // ======共通資料======
    projectNo?: string;
    projectEvent?: string;
    progress?: number;
    updatedAt: Date;
    // ======取得資料======
    // ======傳送資料======
};

export type Molding = {
    // ======共通資料======
    projectNo?: string;
    projectEvent?: string;
    progress?: number;
    updatedAt: Date;
    // ======取得資料======
    moldTemp?: string;          // 模具溫度
    startPos?: string;          // 起始位置
    coolingTime?: string;       // 冷卻時間
    suckBackStroke?: string;    // 鬆退量值
    suckBackPressure?: string;  // 背壓量值
    meltTemp?: string[];        // 熔膠溫度
    injSpeed?: string[];        // 射出速度
    injStroke?: string[];       // 計量位置
    packingPressure?: string[]; // 保壓壓力
    packingTime?: string[];     // 保壓時間
    // ======傳送資料======
    moldNo: string;             // 模具編號
};
