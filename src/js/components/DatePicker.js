import BaseWidget from './BaseWidget.js';
import {utils} from '../utils.js';
import {select, settings} from '../settings.js';

class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

    thisWidget.initPlugin();

  }

  initPlugin(){
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('input', function(){
      thisWidget.correctValue = thisWidget.dom.input.value;
    });

    thisWidget.minDate = new Date(thisWidget.value);


    thisWidget.maxDate = new Date(utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture));


    // eslint-disable-next-line no-undef
    flatpickr(thisWidget.dom.input,{
      enableTime: false,
      dateFormat: 'Y-m-d',
      minDate: thisWidget.minDate,
      defaultDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      'disable': [
        function(date) {
          //return true to disable
          return (date.getDate() === 1 || date.getDay() === 1);

        }
      ],
      'locale': {
        'firstDayOfWeek' : 1 // start week on Monday
      }
    });

  }

  parseValue(){

  }

  isValid(){
    return true;
  }

  renderValue(){

  }
}


export default DatePicker;
