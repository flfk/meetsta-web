import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const propTypes = {
  hasMedal: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool,
};

const defaultProps = {
  isSmall: false,
};

const Emoji = styled.span`
  font-size: ${props => (props.isSmall ? '20px' : '48px')};
  filter: ${props => (props.hasMedal ? '' : 'grayscale(100%)')};
  display: ${props => (props.isSmall && !props.hasMedal ? 'none' : '')};
`;

const Comments = ({ hasMedal, isSmall }) => (
  <Emoji hasMedal={hasMedal} isSmall={isSmall}>
    <span role="img" aria-label="medal">
      🦁
    </span>
  </Emoji>
);

Comments.propTypes = propTypes;
Comments.defaultProps = defaultProps;

const Likes = ({ hasMedal, isSmall }) => (
  <Emoji hasMedal={hasMedal} isSmall={isSmall}>
    <span role="img" aria-label="medal">
      🍓
    </span>
  </Emoji>
);

Likes.propTypes = propTypes;
Likes.defaultProps = defaultProps;

const Tags = ({ hasMedal, isSmall }) => (
  <Emoji hasMedal={hasMedal} isSmall={isSmall}>
    <span role="img" aria-label="medal">
      🔮
    </span>
  </Emoji>
);

Tags.propTypes = propTypes;
Tags.defaultProps = defaultProps;

const Rank = ({ hasMedal, isSmall }) => (
  <Emoji hasMedal={hasMedal} isSmall={isSmall}>
    <span role="img" aria-label="medal">
      💎
    </span>
  </Emoji>
);

Rank.propTypes = propTypes;
Rank.defaultProps = defaultProps;

const Medals = {};
Medals.Likes = Likes;
Medals.Comments = Comments;
Medals.Tags = Tags;
Medals.Rank = Rank;

export default Medals;
