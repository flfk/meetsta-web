import styled from 'styled-components';

const EventImage = styled.div`
  height: 300px;
  width: 584px;
  margin-bottom: 24px;

  img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
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
Wrapper.StripeIcon = StripeIcon;

export default Wrapper;
