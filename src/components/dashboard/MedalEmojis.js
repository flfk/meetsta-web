import PropTypes from 'prop-types';
import React from 'react';
import { FaLock } from 'react-icons/fa';
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
  opacity: ${props => (props.hasMedal ? '1' : '0.4')};
  display: ${props => (props.isSmall && !props.hasMedal ? 'none' : '')};

  max-width: 50px;
`;

const Lock = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;

  font-size: 16px;
  color: black;
  display: ${props => (props.hasMedal ? 'none' : '')};
`;

const Comments = ({ hasMedal, isSmall }) => (
  <Emoji hasMedal={hasMedal} isSmall={isSmall}>
    <span role="img" aria-label="medal">
      🦁
    </span>
    <Lock hasMedal={hasMedal}>
      <FaLock />
    </Lock>
  </Emoji>
);

Comments.propTypes = propTypes;
Comments.defaultProps = defaultProps;

const Likes = ({ hasMedal, isSmall }) => (
  <Emoji hasMedal={hasMedal} isSmall={isSmall}>
    <span role="img" aria-label="medal">
      🍓
    </span>
    <Lock hasMedal={hasMedal}>
      <FaLock />
    </Lock>
  </Emoji>
);

Likes.propTypes = propTypes;
Likes.defaultProps = defaultProps;

const Tags = ({ hasMedal, isSmall }) => (
  <Emoji hasMedal={hasMedal} isSmall={isSmall}>
    <span role="img" aria-label="medal">
      🔮
    </span>
    <Lock hasMedal={hasMedal}>
      <FaLock />
    </Lock>
  </Emoji>
);

Tags.propTypes = propTypes;
Tags.defaultProps = defaultProps;

const Rank = ({ hasMedal, isSmall }) => (
  <Emoji hasMedal={hasMedal} isSmall={isSmall}>
    <span role="img" aria-label="medal">
      💎
    </span>
    <Lock hasMedal={hasMedal}>
      <FaLock />
    </Lock>
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
