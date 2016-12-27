type Status = 'standby' | 'running' | 'done' | 'freeze' | 'error';
type Error = {
    workOrder: string;          // 專案編號
    machineNo: string;          // 機台編號
    errorType: string;          // 異常狀況
    SpindleSpeed: string;       // 轉速
    Feed: string;               // 進給
    Cutters: string;            // 刀刃數
    Depth: string;              // 切深
    Threshold: string;          // 門檻值
    NC_code: string;            // NC碼
}
export interface ICollection {
    _id?: string;               // DB識別碼
}
export interface ILog extends ICollection {
    projectNo: string;          // 專案編號
    message: string;            // 記錄訊息
    receivedAt: Date;           // 接收時間
}
export interface IAMP extends ICollection {
    projectNo: string;          // 專案編號
    projectEvent?: string;      // 專案事件
    receivedAt: Date;           // 接收時間
}
export interface IProject extends IAMP {
    moldNo: string;             // 模具編號
    spec: string;               // 規格描述
    templateNo: string;         // 模具樣板
    customerNo: string;         // 客戶編號
    productName: string;        // 產品名稱
    orderDate: Date;            // 訂單日期
    deadlineDate: Date;         // 完工日期
}
export interface IStage extends IAMP {
    status: Status;             // 處理狀況
    progress: number;           // 處理進度
}
export interface IDesign extends IStage {
    MS_Create?: Status;         // 模型建立
    MS_Surface_Design?: Status; // 分模面設計
    MB_Create?: Status;         // 模座建立
    MB_Detail?: Status;         // 模座細部設計
    MS_Detail?: Status;         // 機構細部設計
    MB_Total_Asm?: Status;      // 總組立
    MB_Asm_Figure?: Status;     // 組立圖
    MB_Com_Figure?: Status;     // 零件圖
}
export interface IComponent extends IStage {
    partNo?: string;            // 零件編號
    machineNo?: string;         // 機台編號
    method?: string;            // 製程名稱
    expectedStartTime?: Date;   // 預估開始時間
    expectedEndTime?: Date;     // 預估結束時間
    startTime?: Date;           // 開始時間
    endTime?: Date;             // 結束時間
    error?: Error[];            // 錯誤訊息
}
export interface IMolding extends IStage {
    moldTemp?: number;          // 模具溫度
    startPos?: number;          // 起始位置
    coolingTime?: number;       // 冷卻時間
    suckBackStroke?: number;    // 鬆退量值
    suckBackPressure?: number;  // 背壓量值
    meltTemp?: number[];        // 熔膠溫度
    injSpeed?: number[];        // 射出速度
    injStroke?: number[];       // 計量位置
    packingPressure?: number[]; // 保壓壓力
    packingTime?: number[];     // 保壓時間
}
