import moment from 'moment-timezone';
import qs from 'qs';

export const getDate = dateStart =>
  moment.tz(dateStart, 'America/Los_Angeles').format('dddd, MMM Do, YYYY');

export const getFormattedNumber = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getParams = props => {
  return qs.parse(props.location.search, { ignoreQueryPrefix: true });
};

export const getTimeRange = (dateStart, dateEnd) => {
  const timeStart = moment.tz(dateStart, 'America/Los_Angeles').format('H:mm');
  const timeEnd = moment.tz(dateEnd, 'America/Los_Angeles').format('H:mm');
  const timeRange = `${timeStart} - ${timeEnd} California Time`;
  return timeRange;
};

export const getTimestamp = () => moment().valueOf();




