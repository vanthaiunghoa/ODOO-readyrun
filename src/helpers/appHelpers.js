import Moment from 'moment';
import 'moment/locale/vi';

export function formatTimeStamp(_milliseconds, _lang = 'vi') {
    const local = Moment(_milliseconds).local();
    const days = Moment().diff(local, 'days');

    let formattedDate = '';
    if (days > 1) {
        formattedDate = local.locale(_lang).format('DD/MM/YYYY');
    } else {
        formattedDate = local.locale(_lang).fromNow();
    }

    return formattedDate;
}

export function handleHtmlTags(_content) {
    return _content.replace(/(<([^>]+)>)/ig, '');
}

export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export function commarize(_number) {
    if (_number >= 1e3) {
        const units = ['K', 'M', 'B', 'T'];

        const unit = Math.floor(((_number).toFixed(0).length - 1) / 3) * 3;

        const num = (_number / (`1e${unit}`)).toFixed(2);

        const unitname = units[Math.floor(unit / 3) - 1];

        return num + unitname;
    }

    return _number.toLocaleString();
}

export function getDistanceTime(_selecetedMonth) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const selecetedDate = new Date(currentYear, _selecetedMonth + 1, 0);

    const prevYear = _selecetedMonth > 0 ? currentYear : currentYear - 1;
    const prevMonth = _selecetedMonth > 0 ? _selecetedMonth : 1;

    const currentDay = _selecetedMonth === currentDate.getMonth()
        ? currentDate.getDate()
        : selecetedDate.getDate();

    const startTime = `${prevYear}-${prevMonth}-1`;
    const endTime = `${currentYear}-${_selecetedMonth + 1}-${currentDay}`;

    return { startTime, endTime };
}
