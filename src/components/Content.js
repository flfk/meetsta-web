import styled from 'styled-components';
import React from 'react';

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

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const SeperatorHalf = styled.div`
  flex: 1 1 0;
  height: 1px;
  margin: 32px 8px;
  background-color: ${COLORS.greys.light};
`;

const Label = styled.label`
  color: ${COLORS.greys.secondary};
  margin-bottom: 8px;
  display: inline-block;
`;

const Spacing = styled.div`
  width: 100%;
  height: 32px;
`;

const Divider = () => {
  return (
    <FlexContainer>
      <SeperatorHalf />
      <Label>OR</Label>
      <SeperatorHalf />
    </FlexContainer>
  );
};

Content.Event = Event;
Content.Seperator = Seperator;
Content.Divider = Divider;
Content.Spacing = Spacing;

export default Content;
