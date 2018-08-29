import styled from 'styled-components';

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

Content.Event = Event;

export default Content;
