import { Form } from 'antd';
import styled from 'styled-components';

const CustomForm = styled(Form)`
    width: 50%;
    height: 50%;
    padding: 20px;
    box-shadow: 10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff;
    border-radius: 15px;

    display: flex;
    flex-direction: column;    
    align-items: center;
    justify-content: center;

    .helperDiv {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .buttonLoginDiv {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5%;

        .buttonLogin {
            margin-left: 10%;
        }
    }

    .ant-row {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        &.loginButton {
            height: 20%;
            display: flex;
            align-items: center;
            width: 100%;
        }

        .ant-col {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;

            .ant-form-item-control-input {
                width: 100%;
            }
        }
    }

    @media all and (max-width: 770px) {
        &.loginForm {
            width: 80%;
            height: 40%;
            display: flex;
            justify-content: center;
        }
    }

    .helperMessage {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-right: 4%;
        font-size: 15px;
    }

`;
export default CustomForm;
