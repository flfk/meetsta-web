import styled from 'styled-components';
import React from 'react';

import COLORS from '../utils/Colors';
import MEDIA from '../utils/Media';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: auto;

  padding-left: 16px;
  padding-right: 16px;

  ${MEDIA.tablet} {
    width: auto;
    margin: 0;
  }
`;

const NoPadding = Content.extend`
  padding: 0;
`;

const CenteredBothAxis = Content.extend`
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const RowGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  > div {
    width: 48%;
  }
`;

const PaddingBottom = Content.extend`
  padding-bottom: 168px;
`;

const Seperator = styled.div`
  height: 1px;
  width: 100%;
  margin: 16px 0;
  background-color: ${COLORS.greys.light};
`;

const Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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

const Anchor = styled.a`
  flex-basis: 100%;
  display: flex;
  text-decoration: none;
  > button {
    flex-basis: 100%;
  }
`;

const Divider = () => {
  return (
    <Center>
      <SeperatorHalf />
      <Label>OR</Label>
      <SeperatorHalf />
    </Center>
  );
};

Content.NoPadding = NoPadding;
Content.Row = Row;
Content.RowGrid = RowGrid;
Content.PaddingBottom = PaddingBottom;
Content.Seperator = Seperator;
Content.Divider = Divider;
Content.Spacing = Spacing;
Content.Center = Center;
Content.CenteredBothAxis = CenteredBothAxis;
Content.Anchor = Anchor;

export default Content;
