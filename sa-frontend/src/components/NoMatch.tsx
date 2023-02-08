import { Button } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

const CustomMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;

    .notFoundMessages {
        height: 40%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .h1, h2 {
        font-family: "Courier New", Courier, monospace;
    }
`;

const Button404 = styled(Button)`
    background: #1976d2;
    height: 6%;
    width: 35%;
    border-radius: 20px;
    color: white;
`;

const NoMatch = () => {
    const { id } = useContext(UserContext);
    const navigate = useNavigate();

    const redirectToPage = () => {
        if(id) {
            navigate("/");
        }
        else {
            navigate("/login");
        }
    }

    return (<div>
        <CustomMainContainer>
            <div className="notFoundMessages">
                <h1>This page isn't here.</h1>
                <h2>Please don't stare.</h2>
            </div>
            <Button404 onClick={redirectToPage}>Go back</Button404>
        </CustomMainContainer>
    </div>);
}

export default NoMatch;