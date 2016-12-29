type Status = 'standby' | 'running' | 'done' | 'freeze' | 'error';
type Error = {
    type: string;               // 異常類型
    spindleSpeed: string;       // 主軸轉速
    feed: string;               // 進給
    cutters: string;            // 刀刃數
    depth: string;              // 切深
    threshold: string;          // 門檻值
    ncCode: string;             // 單節NC碼
    startTime: Date;            // 發生時間
    endTime: Date;              // 抑制時間
};
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
export interface IPart extends IStage {
    partNo?: string;            // 零件編號
    machineNo?: string;         // 機台編號
    method?: string;            // 製程名稱
    expectedStartTime?: Date;   // 預估開始時間
    expectedEndTime?: Date;     // 預估結束時間
    startTime?: Date;           // 實際開始時間
    endTime?: Date;             // 實際結束時間
    error?: Error[];            // 異常資訊
}
export interface IMolding extends IStage {
    type?: 'calc' | 'real';     // 資料類型
    moldNo?: string;            // 模具編號
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
    defectType?: string;        // 缺陷類型
    defectLevel?: string;       // 缺陷參數
    defectParameter?: string;   // 缺陷程度
}
export interface IDesignPost {
    projectNo: string;
    moldNo: string;
    templateNo: string;
    customerNo: string;
    productName: string;
    orderDate: Date;
    deadlineDate: Date;
    receivedAt: Date;
}
