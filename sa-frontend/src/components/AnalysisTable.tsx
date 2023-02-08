/* eslint-disable jsx-a11y/anchor-is-valid */
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Popconfirm, Space, Table } from "antd";
import { ColumnsType, ColumnType, FilterConfirmProps } from "antd/lib/table/interface";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useTranslation } from "react-i18next";
import ApiService from "../services/ApiService";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface DataType {
    key: string;
    date: string;
    articleBrief: string;
}

interface UserArticles {
    articleId: any;
    date: string;
    articleBrief: string;
}

const CustomDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const CustomTableContainer = styled.div`
    height: 97%;

    .ant-pagination {
        height: 3%;
        display: flex;
        justify-content: center;
    }

    .ant-table-wrapper, .ant-spin-nested-loading, .ant-spin-container, .ant-table {
        height: 100%;
    }
`;

type DataIndex = keyof DataType;
const apiService: ApiService = new ApiService();

const AnalysisTable = () => {
    const userArticlesAux: DataType[] = [];
    const [userArticles, setUserArticles] = useState<DataType[]>([]);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { id, accessToken } = useContext(UserContext);

    useEffect(() => {
        apiService.getUserArticles({
            userId: id,
            accessToken: accessToken
        }).then((response) => {
            const result = JSON.parse(JSON.stringify(response));

            result.forEach((article: UserArticles) => {
                const userArticle: DataType = {
                    key: article.articleId,
                    date: article.date.split('T')[0],
                    articleBrief: article.articleBrief,
                }
                userArticlesAux.push(userArticle);
            })
            setUserArticles(userArticlesAux);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleRedirect = (id: any) => {
        navigate(`/show-info/${id}`);
    }

    const handleDeleteArticle = (key: React.Key) => {
        const articleId = key as string;
        apiService.deleteUserArticle({
            userId: id,
            accessToken: accessToken,
            articleId: articleId
        }).then((_: any) => {
            apiService.getUserArticles({
                userId: id,
                accessToken: accessToken
            }).then((response) => {
                const result = JSON.parse(JSON.stringify(response));

                result.forEach((article: UserArticles) => {
                    const userArticle: DataType = {
                        key: article.articleId,
                        date: article.date,
                        articleBrief: article.articleBrief
                    }
                    userArticlesAux.push(userArticle);
                })

                setUserArticles(userArticlesAux);
            });
        });
    }

    const columns: ColumnsType<DataType> = [
        {
            title: "Date",
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
            sorter: (a: any, b: any) => moment(a.date).diff(b.date, 'd'),
            sortDirections: ['descend', 'ascend'],

        },
        {
            title: `${t('BRIEF')}`,
            dataIndex: 'articleBrief',
            key: 'articleBrief',
            ...getColumnSearchProps('articleBrief'),
        },
        {
            title: `${t('ACTION')}`,
            dataIndex: '',
            key: 'x',
            render: (_, record: { key: React.Key }) =>
                userArticles.length >= 1 ? (
                    <CustomDiv>
                        <Popconfirm title={`${t('SEE_MORE')}`} onConfirm={() => handleRedirect(record.key)}>
                            <a>{t('SEE_MORE')}</a>
                        </Popconfirm>

                        <Popconfirm title={`${t('SURE_TO_DELETE')}`} onConfirm={() => handleDeleteArticle(record.key)}>
                            <a>{t('DELETE')}</a>
                        </Popconfirm>
                    </CustomDiv>
                ) : null
        },
    ];

    return (
        <CustomTableContainer className="tableContainer">
            <Table
            columns={columns}
            expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>{record.articleBrief}</p>,
                rowExpandable: record => record.articleBrief !== 'Not Expandable',
            }}
            dataSource={userArticles}
        />
        </CustomTableContainer>
    );
}

export default AnalysisTable;