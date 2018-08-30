import styled from 'styled-components';
import React from 'react';

// import PayPalImg from '../assets/PayPalCheckoutImg.png';
// import PayPalImgDark from '../assets/PayPalCheckoutImgDark.png';

import PayPalImg from '../assets/payPalImgs/PayPalLogoText.png';

const WrapperPayPalImg = styled.div`
  display: inline-block;
  height: 20px;
  width: 74px;

  img {
    height: 100%;
    width: 100%;
  }
`;

const BtnPayPalContainer = styled.button`
  height: 55px;
  width: 600px;
  background-color: #ffc43a;
  border: none;
  border-radius: 30px;

  :hover {
    background-color: #f2ba36;
  }
`;

const BtnPayPalInvalid = () => {
  return (
    <BtnPayPalContainer>
      <WrapperPayPalImg>
        <img src={PayPalImg} alt="" />
      </WrapperPayPalImg>
    </BtnPayPalContainer>
  );
};

export default BtnPayPalInvalid;
