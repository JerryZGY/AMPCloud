type Status = 'standby' | 'running' | 'done' | 'freeze' | 'error';
export interface ICollection {
    _id?: string;
}
export interface ILog extends ICollection {
    projectNo: string;
    message: string;
    receivedAt: Date;
}
export interface IAMP extends ICollection {
    projectNo: string;
    projectEvent?: string;
    receivedAt: Date;
}
export interface IProject extends IAMP {
    orderNo: string;       // 訂單編號 (來自ERP - 2Y004-16120001)
    templateNo: string;    // 模具樣板 (暫時固定為 - 1)
    customerNo: string;    // 客戶編號 (來自ERP - ABCORP)
    productName: string;   // 產品名稱 (來自ERP - 模具)
    orderDate: Date;       // 訂單時間 (來自ERP - 2016-12-20)
    deadlineDate: Date;    // 完工時間 (來自ERP - 2017-01-16)
}
export interface IStage extends IAMP {
    status: Status;
    progress: number;
}
export interface IDesign extends IStage {
    subStatus?: {
        MS_Create: Status;          // 模型建立
        MS_Surface_Design: Status;  // 分模面設計
        MB_Create: Status;          // 模座建立
        MB_Detail: Status;          // 模座細部設計
        MS_Detail: Status;          // 機構細部設計
        MB_Total_Asm: Status;       // 總組立
        MB_Asm_Figure: Status;      // 組立圖
        MB_Com_Figure: Status;      // 零件圖
    };
}
export interface IScheduling extends IStage {
    moldNo: string;
    production: string;
    startDate: Date;
    endDate: Date;
}
export interface IMachining extends IStage {
    machineNo: string;
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
