import * as moment from 'moment';
Template.registerHelper('formatDate', date => date ? moment(date).format('MM/DD HH:mm:ss') : '-');
