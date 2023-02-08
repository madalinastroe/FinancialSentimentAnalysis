import CustomMainContainer from "../shared/CustomMainContainer";
import Navbar from "../shared/Navbar";
import AnalysisTable from "./AnalysisTable";
import styled from 'styled-components';

export const CustomTableDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const PersonalHistory = () => {
    return (
        <CustomMainContainer>
            <Navbar />

            <CustomTableDiv>
                <AnalysisTable />
            </CustomTableDiv>
        </CustomMainContainer>
    );
}

export default PersonalHistory;