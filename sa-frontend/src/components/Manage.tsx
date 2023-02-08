import { FundProjectionScreenOutlined, RiseOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import ApiService from "../services/ApiService";
import CustomMainContainer from "../shared/CustomMainContainer";
import Navbar from "../shared/Navbar";
import Evolution from "./Evolution";
import Trending from "./Trending";

const CustomMenuDiv = styled.div`
    width: 20%;
`;

const CustomMenu = styled(Menu)`
    width: 100%;
    height: 100%;
`;

const CustomContentDiv = styled.div`
    height: 100%;
    width: 100%;
    margin: 25px;
`;

const CustomContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    @media all and (max-width: 450px) {
        &.manage {
            display: flex;
            flex-direction: column;
            overflow: scroll; //TODO
        }

        .manageMenu {
            width: 100%;
            box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
        }
    }
`;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[] | null,
    type?: 'group' | null,
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const apiService: ApiService = new ApiService();

const Manage = () => {
    const [isEvolutionPage, setIsEvolutionPage] = useState(false);
    const [isTrendingPage, setIsTrendingPage] = useState(true);
    const { id, accessToken } = useContext(UserContext);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeUser, setActiveUser] = useState("");
    const { t } = useTranslation();

    const goOnPage = (goals: boolean, status: boolean) => {
        setIsEvolutionPage(goals);
        setIsTrendingPage(status);
    }

    const getUserDetailsArgs = {
        userId: id,
        accessToken: accessToken
    }

    useEffect(() => {
        apiService.getUserDetails(getUserDetailsArgs).then((response) => {
            const result = JSON.parse(JSON.stringify(response));
            localStorage.setItem('activeUser', result.firstName);
            setActiveUser(result.firstName);
        });

        if (localStorage.getItem("currentSubpageManageBudget") === "evolution") {
            goOnPage(true, false);
        }
        else if (localStorage.getItem("currentSubpageManageBudget") === "trending") {
            goOnPage(false, true);
        }

    })

    const items: MenuItem[] = [
        getItem(`${t('TRENDING')}`, 'trending', <RiseOutlined />),

        getItem(`${t('EVOLUTION')}`, 'evolution', <FundProjectionScreenOutlined />),
    ];

    const onClick: MenuProps['onClick'] = e => {
        if (e.key === "evolution") {
            goOnPage(true, false);
            localStorage.setItem("currentSubpageManageBudget", "evolution");
        }
        else if (e.key === "trending") {
            goOnPage(false, true);
            localStorage.setItem("currentSubpageManageBudget", "trending");
      }
    };

    return (
        <CustomMainContainer>
            <Navbar />

            <CustomContainer className="manage">
                <CustomMenuDiv className="manageMenu">
                    <CustomMenu onClick={onClick} mode="vertical" items={items} />
                </CustomMenuDiv>

                <CustomContentDiv>
                    {isTrendingPage && !isEvolutionPage && <Trending />}
                    {!isTrendingPage && isEvolutionPage && <Evolution/>}
                </CustomContentDiv>

            </CustomContainer>
        </CustomMainContainer>
    );
}

export default Manage;