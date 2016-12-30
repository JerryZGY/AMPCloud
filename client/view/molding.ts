import './molding.html';
import './molding.scss';
import * as c3 from 'c3';
import * as Models from '../../lib/models';
import { Router } from '../main';
import { Moldings, Designs } from '../../lib/collections';

let charts = [];
let preloaded = false;
let autorunHandle: Tracker.Computation = null;
let subscribeHandle: Meteor.SubscriptionHandle = null;

Template['molding'].onCreated(function () {
    $('body').attr('class', 'molding');
    subscribeHandle = this.subscribe('moldings');
});

Template['molding'].onRendered(function () {
    autorunHandle = this.autorun(() => {
        if (subscribeHandle.ready()) {
            const moldings = Moldings.find({ projectNo: Router.get('id') }, { sort: { timeIndex: 1 } }).fetch().filter(x => x.type === 'real');
            const formatedMoldings = formatMoldings(moldings);
            setTimeout(() => renderChart(formatedMoldings), 0);
        }
    });
});

Template['molding'].onDestroyed(function () {
    charts = [];
    preloaded = false;
    if (autorunHandle) { autorunHandle.stop(); }
    if (subscribeHandle) { subscribeHandle.stop(); }
});

Template['molding'].helpers({
    moldings: () => Moldings.find({ projectNo: Router.get('id') }, { sort: { timeIndex: -1 }, limit: 50 }),
    parseArray: (data: string[]) => data.map(datum => datum ? datum : '0').join(', '),
    hasDefect: (err) => err ? 'active' : '',
});

Template['molding'].events({
    'click .info'() {
        const target = $(`#${this._id}>div`);
        if (target.length) { target.data('dialog').open(); }
    },
});

type Molding = {
    meltTemp: string[][];
    injSpeed: string[][];
    packingPressure: string[][];
};

enum Level { '一', '二', '三', '四', '五' }

/**
 * Input: [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
 * Output: [[1, 3, 5, 7, 9], [2, 4, 6, 8, 10]]
 */
function transformDimension(source: string[][]) {
    let results = [];
    source.forEach(src => {
        src.forEach((x, columnsIndex) => {
            results[columnsIndex] = source.map((y, dataIndex) => source[dataIndex][columnsIndex] || 0);
        });
    });
    return results;
}

function formatMoldings(moldings: Models.IMolding[]): Molding {
    const data = {
        meltTemp: [],           // 熔膠溫度
        injSpeed: [],           // 射出速度
        packingPressure: [],    // 保壓壓力
    };
    moldings.forEach(molding => {
        data.meltTemp.push(molding.meltTemp);
        data.injSpeed.push(molding.injSpeed);
        data.packingPressure.push(molding.packingPressure);
    });
    data.meltTemp = transformDimension(data.meltTemp);
    data.injSpeed = transformDimension(data.injSpeed);
    data.packingPressure = transformDimension(data.packingPressure);
    return data;
}

function renderChart(molding: Molding) {
    const meltTempColumns = molding.meltTemp.map((array, index) => [`熔膠溫度${Level[index]}`, ...array]);
    const injSpeedColumns = molding.injSpeed.map((array, index) => [`射出速度${Level[index]}`, ...array]);
    const packingPressureColumns = molding.packingPressure.map((array, index) => [`保壓壓力${Level[index]}`, ...array]);
    if (!charts.filter(Boolean).length) {
        const meltTempChart = c3.generate({
            bindto: '#meltTemp',
            data: { columns: meltTempColumns },
            axis: { x: { label: { text: '模次', position: 'outer-center' } }, y: { label: { text: '溫度', position: 'outer-middle' } } },
        });
        charts.push(meltTempChart);
        const injSpeedChart = c3.generate({
            bindto: '#injSpeed',
            data: { columns: injSpeedColumns },
            axis: { x: { label: { text: '模次', position: 'outer-center' } }, y: { label: { text: '速度', position: 'outer-middle' } } },
        });
        charts.push(injSpeedChart);
        const packingPressureChart = c3.generate({
            bindto: '#packingPressure',
            data: { columns: packingPressureColumns },
            axis: { x: { label: { text: '模次', position: 'outer-center' } }, y: { label: { text: '壓力', position: 'outer-middle' } } },
            onrendered: () => {
                if (!preloaded) {
                    $('#preloader').fadeOut(1000);
                    $('.table').fadeTo(1200, 1);
                    $('.tabcontrol').fadeTo(1200, 1);
                    preloaded = true;
                }
            },
        });
        charts.push(packingPressureChart);
    } else {
        charts[0].load({ columns: meltTempColumns });
        charts[1].load({ columns: injSpeedColumns });
        charts[2].load({ columns: packingPressureColumns });
    }
}
