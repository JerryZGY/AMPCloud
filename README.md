AMP_SampleData
===
- `(1)[ASMX → AMP]`
```
POST http: //id40.webpat.co/amp/receive
{
    "projectNo": "2Y004-16120004",
    "projectEvent": "ERP start",
    "moldNo": "161200041M,161200043M",
    "spec": "100萬模次",
    "templateNo": "1",
    "customerNo": "ABCORP",
    "productName": "模具",
    "orderDate": "2016-12-20",
    "deadlineDate": "2017-01-16"
}
```
- `(2)[Design → AMP]`
```
POST http: //id40.webpat.co/amp/receive
{
    "projectNo": "2Y004-16120004",
    "projectEvent": "Design start|middle|end",
    "status": "standby | running | done | freeze | error",
    "progress": 0,
    "MS_Create": "running",
    "MS_Surface_Design": "freeze",
    "MB_Create": "freeze",
    "MB_Detail": "freeze",
    "MS_Detail": "freeze",
    "MB_Total_Asm": "freeze",
    "MB_Asm_Figure": "freeze",
    "MB_Com_Figure": "freeze",
}
```
- `(3)[Scheduling → AMP]`
```
POST http: //id40.webpat.co/amp/receive
[
    {
        "projectNo": "2Y004-16120004",
        "projectEvent": "Scheduling start|middle|end",
        "partNo": "161200041M_CA001",
        "machineNo": "YTM001",
        "method": "CNC",
        "expectedStartTime": "2016-12-20T16:00:00.0000000+08:00",
        "expectedEndTime": "2016-12-21T16:00:00.0000000+08:00",
    }
]
```
- `(4)[Machining → AMP]`
```
POST http: //id40.webpat.co/amp/receive
{
    "projectNo": "2Y004-16120004",
    "projectEvent": "Machining start|middle|error|resolve|end",
    "status": "standby | running | done | freeze | error",
    "progress": 0,
    "partNo": "161200041M_CA001",
    "machineNo": "YTM001",
    "method": "CNC",
    "startTime": "2016-12-20T17:00:00.0000000+08:00",
    "endTime": "2016-12-21T17:00:00.0000000+08:00",
    "error": {
        "type": "Chatter",
        "spindleSpeed": "5000",
        "feed": "1500",
        "cutters": "4",
        "depth": "0.2",
        "threshold": "1.05",
        "ncCode": "N65 X77.789 Y50.156 Z-.2",
        "startTime": "2016-12-20T18:00:00.0000000+08:00",
        "endTime": "2016-12-20T19:00:00.0000000+08:00",
    }
}
```
- `(5)[Molding → AMP]`
```
POST http: //id40.webpat.co/amp/receive
{
    "projectNo": "2Y004-16120004",
    "projectEvent": "Molding start|middle|defect end|end",
    "status": "standby | running | done | freeze | error",
    "progress": 0,
    "type": "calc | real"
    "moldNo": "161200041M",
    "moldTemp": "60",
    "startPos": "13",
    "coolingTime": "4.4",
    "suckBackStroke": "3",
    "suckBackPressure": "30",
    "meltTemp": [
        "210",
        "200",
        "190",
        "180",
        "170"
    ],
    "injSpeed": [
        "35",
        "35.9",
        "10",
        "0",
        "0"
    ],
    "injStroke": [
        "10",
        "10",
        "8",
        "10",
        "10"
    ],
    "packingPressure": [
        "743.5",
        "956",
        "531.1",
        "0",
        "0"
    ],
    "packingTime": [
        "0.4",
        "1",
        "0.3",
        "0",
        "0"
    ],
    "defect": {
        "type": "充填不足",
        "param": "射出速度",
        "level": "嚴重"
    }
    "timeIndex": "2016-12-20T20:00:00.0000000+08:00"
}
```