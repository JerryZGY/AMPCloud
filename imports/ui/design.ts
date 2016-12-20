import './design.html';
import './design.scss';

Template['design'].onCreated(() => {
    $('body').attr('class', 'design');
    $('#icon').attr('class', 'mif-pencil');
    $('#identify').text('PJ20161206001');
});

Template['design'].onDestroyed(() => {
    $('#identify').text('');
});
