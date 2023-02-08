import { Button, Form, Modal, Select, Progress, Collapse } from "antd";
import CustomMainContainer from "../shared/CustomMainContainer";
import Navbar from "../shared/Navbar";
import styled from 'styled-components';
import TextArea from "antd/lib/input/TextArea";
import CustomContainer from "../shared/CustomContainer";
import CustomForm from "../shared/CustomForm";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../shared/CustomButton";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ApiService from "../services/ApiService";
import useApiError from "./hooks/useApiErrors";
import { openNotification } from "../shared/Notification";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts'
import moment from "moment";
import { UserContext } from "../context/UserContext";

const escapeString = require('escape-string-regexp');

const apiService: ApiService = new ApiService();

const { Option } = Select;
const { Panel } = Collapse;

export const CustomFormTextAnalyzer = styled(CustomForm)`
    width: 50%;
    min-width: 600px;
    height: 85%;
    box-shadow: none;

    .dashboardButton {
      width: 150px;
      height: 50px;
      font-size: 20px;
    }

    @media all and (min-width: 450px) {
        &.dashboardForm {
            .buttonForm {
                .ant-form-item-control-input-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }

    @media all and (max-width: 450px) {
        &.dashboardForm {
            .buttonForm {
                .ant-form-item-control-input-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }

    @media all and (max-width: 380px) and (max-height: 700px) {
        .textarea {
            height: 150px;
        }
    }
`;

export const CustomDashboardSecondaryContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;

    .highlighted-text {
      cursor: pointer;
    }

    .textarea {
      border-radius: 15px;
      box-shadow: 10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff;
      resize: none;
      padding: 15px;
    }

    .modalSaveArticleDiv {
        display: flex;
        justify-content: center;
    }

    .detailedAnalysisDiv {
        width: 70%;
        margin-top: 70px;

        .highlighterWrapper {
          display: flex;
        }

        .originalText, .summarizedText {
            display: inline-block;
            width: 46%;
            margin: 2%;
            border-radius: 15px;
            box-shadow: 7px 7px 13px #d9d9d9, -7px -7px 13px #ffffff;
            padding: 20px 40px 30px 40px;
            border: 1px solid #d9d9d9;
            background: #ffffff;
        }

        .originalContent, .summarizedContent {
            margin-top: 20px;
            max-height: 350px;
            overflow: scroll;
        }

        .originalTitle, .summarizedTitle {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .scores {
          box-shadow: 7px 7px 13px #d9d9d9, -7px -7px 13px #ffffff;
          margin: 2%;
          border-radius: 15px;
          border: 1px solid #d9d9d9;
          background: #ffffff;
          padding: 20px 30px 20px 30px;
          display: flex;
          justify-content: space-evenly;
        }

        .sentimentStatistics {
          .neutral {
              .ant-progress-text {
                  color: #1890ff;
              }
          }

          .positive {
              .ant-progress-text {
                  color: #52c41a;
              }
          }

          .negative {
              .ant-progress-text {
                  color: red;
              }
          }
        }

        .trendChart {
          box-shadow: 7px 7px 13px #d9d9d9, -7px -7px 13px #ffffff;
          margin: 2%;
          margin-top: 4%;
          border-radius: 15px;
          border: 1px solid #d9d9d9;
          background: #ffffff;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
    }
`;

interface DailyStatistic {
    date: string;
    numberOfOccurrences: number;
}

interface SentimentScore {
    label: string;
    score: number;
}

const Dashboard = () => {
    const [positiveScore, setPositiveScore] = useState(0);
    const [negativeScore, setNegativeScore] = useState(0);
    const [neutralScore, setNeutralScore] = useState(0);
    const [inputText, setInputText] = useState("");
    const [summarizedText, setSummarizedText] = useState("");
    const [form] = CustomForm.useForm();
    const { t } = useTranslation();
    const [isSubmitedAnalysis, setIsSubmittedAnalysis] = useState(false);
    const [isBasicAnalysis, setIsBasicAnalysis] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { formLevelError, handleApiError } = useApiError();
    const [isError, setIsError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [keywords, setKeywords] = useState<any>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dailyStatistics, setDailyStatistics] = useState<DailyStatistic[]>([]);
    const [selectedKeywords, setSelectedKeywords] = useState<any[]>([]);
    const [keywordsData, setKeywordsData] = useState<any[]>([]);
    const [numberOfLastDays, setNumberOfLastDays] = useState(7);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userArticle, setUserArticle] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(0);
    const [definitionObj, setDefinitionObj] = useState<any[]>([]);
    const [isDefinitionVisible, setIsDefinitionVisible] = useState(false);
    const [definitionActiveKey, setDefinitionActiveKey] = useState(0);

    const { id, accessToken } = useContext(UserContext);

    const handleOnClose = () => {
        setIsError(false);
    };


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        apiService.addArticle(userArticle).then((response) => {
            console.log(response)
        }).catch((error) => {
            handleApiError(error.response.data);
            setIsError(true);
        });
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (!isError) {
            return;
        }
        openNotification('Error', formLevelError, 'error', handleOnClose);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError])

    const onFinish = (values: any) => {
        const args = escapeString(values.articleContent.replaceAll("\n", " "));
        setInputText(args);
        var neg = 0;
        var pos = 0;
        var neu = 0;
        let deviation = Math.floor(Math.random() * 10) * (Math.random() < 0.5 ? -1 : 1)
        setTimeout(() => {
            setLoadingStatus(10 + deviation);
        }, 100)
        setIsLoading(true);
        setIsLoaded(false);

        apiService.getSentimentAnalysis({ args }).then((response) => {
            const result: SentimentScore[] = JSON.parse(JSON.stringify(response));
            result.forEach((element: SentimentScore) => {
                if (element.label === "positive") {
                    setPositiveScore(Number(element.score.toFixed(3)));
                    pos = Number(element.score.toFixed(3));
                }
                else if (element.label === "neutral") {
                    setNeutralScore(Number(element.score.toFixed(3)));
                    neu = Number(element.score.toFixed(3));
                }
                else if (element.label === 'negative') {
                    setNegativeScore(Number(element.score.toFixed(3)));
                    neg = Number(element.score.toFixed(3));
                }
            })
            deviation = Math.floor(Math.random() * 10) * (Math.random() < 0.5 ? -1 : 1)
            setLoadingStatus(33 + deviation);
            apiService.getSummarizedText({ args }).then((response) => {
                const auxSummarizedText = JSON.parse(JSON.stringify(response));
                setSummarizedText(response);
                deviation = Math.floor(Math.random() * 10) * (Math.random() < 0.5 ? -1 : 1)
                setLoadingStatus(66 + deviation);
                apiService.getKeywords({ args }).then((response) => {
                    const result = JSON.parse(JSON.stringify(response));

                    var keywordsArray: string[] = [];

                    result.forEach((element: string) => {
                        keywordsArray.push(element);

                        const item = {
                            userId: id,
                            accessToken: accessToken,
                            keywordName: element,
                            timestamp: moment()
                        }

                        apiService.addUserSearches(item).then((response) => {
                        })
                    })

                    setKeywords(keywordsArray);

                    const userArticle: any = {
                        articleContent: values.articleContent,
                        articleBrief: auxSummarizedText,
                        negative: neg,
                        neutral: neu,
                        positive: pos,
                        date: new Date(),
                        userId: id,
                        keywords: keywordsArray,
                        accessToken: accessToken
                    }

                    setUserArticle(userArticle);
                    setLoadingStatus(100);
                    setTimeout(() => {
                        setIsLoading(false);
                        setIsLoaded(true);
                        setLoadingStatus(0);
                    }, 500)

                });
                setInputText(values.articleContent);
            });
        }).catch((err: any) => { console.log(err) });

        setIsSubmittedAnalysis(true);

    };

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
                        const dateString = elem.date.split('T')[0]
                        if (auxObj[dateString]) {
                            auxObj[dateString][k] = elem.numberOfOccurrences;
                            return;
                        }
                        auxObj[dateString] = {};
                        auxObj[dateString][k] = elem.numberOfOccurrences;
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
        setIsSubmittedAnalysis(false);
        setIsBasicAnalysis(true);
    }, []);

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
                {isBasicAnalysis && <CustomContainer>
                    <CustomFormTextAnalyzer
                        name="basic"
                        className="dashboardForm"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        form={form}
                        autoComplete="off"
                        initialValues={{
                            articleContent: '',
                            date: new Date(),
                            userId: id
                        }}
                    >
                        <h2 className="titleEditAccount" style={{ color: '#1976d2', fontSize: 30, fontWeight: 600, paddingBottom: 30 }}>{t('ADD_HERE_YOUR_TEXT')}</h2>

                        <Form.Item
                            style={{ height: "100%" }}
                            name="articleContent"
                            rules={[{ required: true, message: 'Please input text here!' }]}
                        >
                            <TextArea className="textarea" name="articleContent" rows={16} />

                        </Form.Item>

                        {isLoading ?
                            (<Progress
                                percent={loadingStatus} status="active"
                                style={{ marginTop: 72 }}
                            />) :
                            (<Form.Item
                                className="buttonForm"
                            >
                                <CustomButton
                                    type="primary"
                                    htmlType="submit"
                                    className="dashboardButton"
                                    size="large"
                                    style={{ marginTop: 20 }}
                                >
                                    {t('SUBMIT')}
                                </CustomButton>
                            </Form.Item>
                            )}
                    </CustomFormTextAnalyzer>
                </CustomContainer>}

                {isSubmitedAnalysis && isBasicAnalysis && isLoaded &&
                    <Button style={{ position: 'absolute', right: 60, top: '45%' }} onClick={() => setIsBasicAnalysis(false)} shape="circle" type="primary" size="large">
                        <RightOutlined />
                    </Button>
                }

                {isSubmitedAnalysis && !isBasicAnalysis &&
                    <Button style={{ position: 'absolute', left: 60, top: '45%' }} onClick={() => { setIsBasicAnalysis(true); setIsSubmittedAnalysis(false); setIsLoaded(false); setKeywordsData([]); }} shape="circle" type="primary" size="large">
                        <LeftOutlined />
                    </Button>
                }

                {!isBasicAnalysis &&
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
                            <Progress className="positive" type="circle" percent={(positiveScore || 0) * 100} status="success" format={() => `${(positiveScore*100).toFixed(1)}%`} strokeColor="#52c41a" />
                            <Progress className="neutral" type="circle" percent={(neutralScore || 0) * 100} status="normal" format={() => `${(neutralScore*100).toFixed(1)}%`} strokeColor="#1890f" />
                            <Progress className="negative" type="circle" percent={(negativeScore || 0) * 100} status="exception" format={() => `${(negativeScore*100).toFixed(1)}%`} strokeColor="red" />
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
                        <div className="modalSaveArticleDiv">
                            <CustomButton type="primary" onClick={showModal}>
                                Save article
                            </CustomButton>
                            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <p>Save article to your account?</p>
                            </Modal>
                        </div>
                        <div style={{ height: 70 }} />
                    </div>}
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

export default Dashboard;
