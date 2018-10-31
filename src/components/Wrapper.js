import styled from 'styled-components';

import MEDIA from '../utils/Media';

const EventImage = styled.div`
  height: 300px;
  width: 584px;
  // margin-bottom: 24px;

  img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }

  ${MEDIA.tablet} {
    width: auto;
    height: auto;
  }
`;

const ProfileImage = styled.div`
  height: 40px;
  width: 40px;

  margin-right: 8px;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;

const ProfileImgLarge = styled.div`
  height: 80px;
  width: 80px;
  align-self: center;

  margin: 16px;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;

const StripeIcon = styled.div`
  height: 26px;
  width: 120px;
  display: inline-block;

  img {
    height: 100%;
    width: 100%;
  }
`;

const Wrapper = {};
Wrapper.EventImage = EventImage;
Wrapper.ProfileImage = ProfileImage;
Wrapper.ProfileImgLarge = ProfileImgLarge;
Wrapper.StripeIcon = StripeIcon;

export default Wrapper;
