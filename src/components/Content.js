import styled from 'styled-components';

import COLORS from '../utils/Colors';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: auto;
  padding-bottom: 168px;
`;

const Event = Content.extend`
  padding-bottom: 168px;
`;

const Seperator = styled.div`
  height: 1px;
  width: 100%;
  margin: 16px 0;
  background-color: ${COLORS.greys.light};
`;

Content.Event = Event;
Content.Seperator = Seperator;

export default Content;
