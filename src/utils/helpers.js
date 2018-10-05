import moment from 'moment-timezone';
import qs from 'qs';

export const getTimeRange = (dateStart, dateEnd) => {
  const timeStart = moment.tz(dateStart, 'America/Los_Angeles').format('H:mm');
  const timeEnd = moment.tz(dateEnd, 'America/Los_Angeles').format('H:mm');
  const timeRange = `${timeStart} - ${timeEnd} California Time`;
  return timeRange;
};

export const getDate = dateStart => moment(dateStart).format('dddd, MMM Do, YYYY');

export const getParams = props => {
  return qs.parse(props.location.search, { ignoreQueryPrefix: true });
};
