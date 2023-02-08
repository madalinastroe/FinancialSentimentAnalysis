import styled from 'styled-components';

const CustomMainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 95%;

    @media all and (max-width: 770px) {
        &.container {
            height: 100%;
        }

        .customBox {
            height: 80%;
        }

        .MuiPaper-root {
            height: 70%;
        }
      }

    @media all and (max-width: 800px) and (max-height: 1024px) { 
        .MuiPaper-root {
            height: 70%;
        }
    }

    @media all and (max-width: 10240px) and (max-height: 600px) { 
        &.container {
            height: 100%;
        }

        .MuiPaper-root {
            height: 10%;
        }

        .customBox {
           height: 80%;
        }
    }

    @media all and (max-width: 380px) and (max-height: 700px) {
        height: 100vh;
    }
`;

export default CustomMainContainer;