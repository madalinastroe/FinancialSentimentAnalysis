import styled from 'styled-components';

const CustomContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .divAlert {
        height: 12%;
        width: 35%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media all and (min-width: 450px) {
        .editProfileForm {

            .buttonEditProfile {
                .ant-col {
                    margin: 0;
                    .ant-form-item-control-input-content {
                        display: flex;
                        justify-content: center;
                    }
                }
            }

            .helperDiv {
                .ant-row {
                    .ant-col {
                        width: 30%
                    }
                }
            }
        }
    }


    @media all and (max-width: 450px){
        .sentimentStatistics {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 20%;
            margin-top: 10%;
        }

        &.editProfileContainer {
            .editProfileForm {
                width: 90%;
                height: 100%;

                .buttonEditProfile {
                    .ant-col {
                        margin: 0;
                        .ant-form-item-control-input-content {
                            display: flex;
                            justify-content: center;
                        }

                    }
                }
            }

            .titleEditAccount {
                margin-top: 20%;
            }
        }
    }

    @media all and (min-width: 450px) {
        .sentimentStatistics {
           width: 100%;
           display: flex;
           align-items: center;
           justify-content: space-around;
           margin-top: 20px;
        }
    }

    @media all and (max-width: 380px) and (max-height: 720px) {
        .sentimentStatistics {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }

    @media all and (max-width: 1024px) and (max-height: 720px) {
        &.editProfileContainer {
            .editProfileForm {
              width: 90%;
              height: 100%;
            }
        }

        .titleEditAccount {
            margin-top: 10%;
        }
    }
    
    @media all and (max-width: 1300px) and (max-height: 1400px) {
        &.editProfileContainer {
            .editProfileForm {
              width: 90%;
              
              .buttonEditProfile {
                .ant-col {
                    margin: 0;
                    .ant-form-item-control-input-content {
                        display: flex;
                        justify-content: center;
                    }}}

              .helperDiv {
                .ant-row {
                    .ant-col {
                        width: 30%
                    }}}}}}
`;
export default CustomContainer;
