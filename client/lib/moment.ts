import * as moment from 'moment';
Template.registerHelper('formatDate', date => date ? moment(date).format('YYYY/MM/DD HH:mm:ss') : '-');
