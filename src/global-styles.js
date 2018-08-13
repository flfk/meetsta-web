import { injectGlobal } from 'styled-components';
import LeckerliOne from './LeckerliOne-Regular.ttf';

injectGlobal`
  @font-face {
    font-family: LeckerliOne;
    src: url(${LeckerliOne});
  }
`;