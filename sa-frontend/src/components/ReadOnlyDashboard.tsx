import { Collapse, Modal, Select } from "antd";
import CustomMainContainer from "../shared/CustomMainContainer";
import Navbar from "../shared/Navbar";
import { Progress } from 'antd';
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Highlighter from "react-highlight-words";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts'
import { CustomDashboardSecondaryContainer } from "./Dashboard";
import { useParams } from "react-router-dom";
import ApiService from "../services/ApiService";
import moment from "moment";
import { UserContext } from "../context/UserContext";

const apiService: ApiService = new ApiService();

interface RetrievedArticle {
    date: string;
    articleContent: string;
    articleBrief: string;
    negative: number;
    neutral: number;
    positive: number;
    keywords: string[];
}

const ReadOnlyDashboard = () => {
    const [positiveScore, setPositiveScore] = useState(0);
    const [negativeScore, setNegativeScore] = useState(0);
    const [neutralScore, setNeutralScore] = useState(0);
    const [inputText, setInputText] = useState("");
    const [summarizedText, setSummarizedText] = useState("");
    const { t } = useTranslation();
    const [keywords, setKeywords] = useState<any>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedKeywords, setSelectedKeywords] = useState<any[]>([]);
    const [numberOfLastDays, setNumberOfLastDays] = useState(7);
    const articleId = useParams();
    const [keywordsData, setKeywordsData] = useState<any[]>([]);
    const [definitionObj, setDefinitionObj] = useState<any[]>([]);
    const [isDefinitionVisible, setIsDefinitionVisible] = useState(false);
    const [definitionActiveKey, setDefinitionActiveKey] = useState(0);

    const { id, accessToken } = useContext(UserContext);

    const { Option } = Select;
    const { Panel } = Collapse;

    const getKeywordsStatistics = (values: string[]) => {
        const auxObj: any = {};
        const apiCalls: any[] = [];

        setSelectedKeywords(values);

        values.forEach((k: string) => {
            apiCalls.push(new Promise((resolve) => {
                const item = {
                    keyword: k,
                    start: moment().subtract(numberOfLastDays, 'd').format("YYYY-MM-DD"),
                    end: moment().format("YYYY-MM-DD")
                }

                apiService.getEvolutionForKeyphrase(item).then((response) => {
                    const result = JSON.parse(JSON.stringify(response));
                    result.forEach((elem: any) => {
                        if (auxObj[elem.date]) {
                            auxObj[elem.date][k] = elem.numberOfOccurrences;
                            return;
                        }
                        auxObj[elem.date] = {};
                        auxObj[elem.date][k] = elem.numberOfOccurrences;
                    })
                    resolve(true);
                })
            }))
        })

        Promise.all(apiCalls).then(() => {
            const newKeywordsData: any[] = [];
            Object.entries(auxObj).forEach(([key, val]) => {
                const valObj: object = val as object;
                newKeywordsData.push({ date: key, ...valObj })
            })
            setKeywordsData(newKeywordsData)
        });
    }


    useEffect(() => {
        const item = {
            userId: id,
            accessToken: accessToken,
            articleId: articleId.id as unknown as string
        }

        apiService.getArticle(item).then((response) => {
            const result = JSON.parse(JSON.stringify(response));

            console.log(result);

            const articleDetailes: RetrievedArticle = {
                date: result.date,
                positive: result.positive,
                neutral: result.neutral,
                negative: result.negative,
                articleContent: result.articleContent,
                articleBrief: result.articleBrief,
                keywords: result.keywords
            }

            console.log(articleDetailes.keywords)

            setNeutralScore(articleDetailes.neutral);
            setPositiveScore(articleDetailes.positive);
            setNegativeScore(articleDetailes.negative);
            setInputText(articleDetailes.articleContent);
            setSummarizedText(articleDetailes.articleBrief)
            setKeywords(result.keywords)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const HighlightTag = (highlightProps: any) => {
        const { children } = highlightProps;

        return (
            <mark
                onClick={() => {
                    const explanation: any[] = [];
                    const promiseArr: any[] = [];
                    const words = children.split(" ");
                    words.forEach((elem: any) => {
                        promiseArr.push(new Promise((resolve) => {
                            apiService.getWordDefinition(elem).then(response => {
                                const meanings = response[0].meanings.map((meaning: any) => ({
                                    definitions: meaning.definitions.map((def: any) => def.definition),
                                    type: meaning.partOfSpeech
                                }))
                                explanation.push({ meaning: meanings, word: elem });
                                resolve(true);
                            }).catch((err: any) => {
                                explanation.push({ error: true, word: elem });
                                resolve(true);
                            })
                        }))
                    })
                    Promise.all(promiseArr).then(() => {
                        setDefinitionObj(explanation);
                        setIsDefinitionVisible(true);
                    })
                }}
                className="highlighted-text"
            >
                {children}
            </mark>
        )
    };

    return (
        <CustomMainContainer>
            <Navbar />

            <CustomDashboardSecondaryContainer>
                <div className="detailedAnalysisDiv">

                    <div className="highlighterWrapper">
                        <div className="originalText">
                            <div className="originalTitle">
                                <h2 style={{ color: '#1976d2', paddingBottom: 10 }}>{t('ORIGINAL_TEXT')}</h2>
                            </div>

                            <div className="originalContent">
                                <Highlighter
                                    searchWords={keywords}
                                    autoEscape={true}
                                    highlightTag={HighlightTag}
                                    textToHighlight={inputText}
                                    highlightStyle={{ backgroundColor: 'yellow' }}
                                />
                            </div>
                        </div>

                        <div className="summarizedText">
                            <div className="summarizedTitle">
                                <h2 style={{ color: '#1976d2', paddingBottom: 10 }}>{t('SUMMARIZED_TEXT')}</h2>
                            </div>

                            <div className="summarizedContent">
                                <Highlighter
                                    searchWords={keywords}
                                    autoEscape={true}
                                    highlightTag={HighlightTag}
                                    textToHighlight={summarizedText.replaceAll('\\.', '.')}
                                    highlightStyle={{ backgroundColor: 'yellow' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="scores sentimentStatistics">
                        <Progress className="positive" type="circle" percent={(positiveScore || 0) * 100} status="success" format={() => `${(positiveScore * 100).toFixed(1)}%`} strokeColor="#52c41a" />
                        <Progress className="neutral" type="circle" percent={(neutralScore || 0) * 100} status="normal" format={() => `${(neutralScore * 100).toFixed(1)}%`} strokeColor="#1890f" />
                        <Progress className="negative" type="circle" percent={(negativeScore || 0) * 100} status="exception" format={() => `${(negativeScore * 100).toFixed(1)}%`} strokeColor="red" />
                    </div>

                    <div className="trendChart">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '80%', marginBottom: 10, marginTop: 5 }}
                            placeholder="Please select keyword"
                            defaultValue={[]}
                            size="large"
                            onChange={getKeywordsStatistics}
                        >

                            {keywords.map((keyword: any) => <Option key={keyword}>{keyword}</Option>)}

                        </Select>
                        <Select
                            style={{ width: '80%', marginBottom: 30 }}
                            placeholder="Please select"
                            defaultValue={[t('LAST_WEEK')]}
                            size="large"
                            onChange={(value: any) => setNumberOfLastDays(value)}
                        >
                            <Option value={7}>{t('LAST_WEEK')}</Option>
                            <Option value={30}>{t('LAST_MONTH')}</Option>
                            <Option value={180}>{t('LAST_6_MONTHS')}</Option>
                            <Option value={365}>{t('LAST_YEAR')}</Option>
                        </Select>
                        <LineChart style={{ marginRight: 45 }} width={770} height={250} data={keywordsData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            {
                                selectedKeywords.map((k: any) => <Line type="monotone" dataKey={k} stroke={"#" + ((1 << 24) * Math.random() | 0).toString(16)} key={k} />)
                            }
                        </LineChart>
                    </div>

                    <div style={{ height: 70 }} />
                </div>
                <Modal visible={isDefinitionVisible} onCancel={() => { setDefinitionObj([]); setIsDefinitionVisible(false); setDefinitionActiveKey(0); }} footer={null}>
                    <Collapse style={{ margin: '30px 20px 20px 20px' }} activeKey={definitionActiveKey} onChange={(key: any) => { setDefinitionActiveKey(key); }}>
                        {definitionObj.map((def: any, index: any) => (
                            <Panel header={def.word} key={index}>
                                {
                                    def.meaning && (<div style={{ maxHeight: 200, overflow: 'scroll' }} >
                                        {
                                            def.meaning.map((meaning: any) => (
                                                <div>
                                                    <h3>{meaning.type}</h3>
                                                    <ol>
                                                        {meaning.definitions.map((e: any) => <li>{e}</li>)}
                                                    </ol>
                                                </div>
                                            ))
                                        }
                                    </div>)
                                }
                            </Panel>
                        ))}
                    </Collapse>
                </Modal>
            </CustomDashboardSecondaryContainer>
        </CustomMainContainer>
    );
}

export default ReadOnlyDashboard;