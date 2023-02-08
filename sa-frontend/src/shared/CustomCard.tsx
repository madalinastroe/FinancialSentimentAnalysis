import { Button, Card } from "antd";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import styled from 'styled-components';

const { Meta } = Card;

const CustomHistoryCard = styled(Card)`
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    margin-top: 20px;

    @media all and (max-width: 450px) {
        &.ant-card {
           height: 40%;
           width: 85%;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: space-around;
        }

        .scores {
            height: 60%;
            width: 70vw;
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-left: 0;
            margin-top: 10%;

            .scoresContent {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                width: 40%;

                .record {
                    display: flex;
                    justify-content: space-around;
                    width: 80%;
                }
            }

            .chart {
                width: 45%;
                height: 15vh;
                box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;

                .recharts-surface {
                  width: 50%;
                  height: 50%;
                }
              }
    
            
        }

        .buttonDiv {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70vw;   
            height: 50%;
        }
    }

    @media all and (min-width: 450px) {
        .scores {
            width: 100%;
            margin-top: 5%;
            margin-bottom: 5%;
            display: flex;
            justify-content: space-around;

            .scoresContent {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                width: 100%;
            }

            .chart {
                width: 100%;
                display: flex;
                justify-content: center;

                .recharts-surface {
                  width: 100%;
                  height: 100%;
                }
            }
        }

        
        .record {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
        }

        .buttonDiv {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ant-card-body {
            width: 100%;
            margin: 2%;
        }

        &.ant-card {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 20px;
            width: 40%;
        }
    }

    @media all and (max-width: 450px) and (max-height: 700px) {
        &.ant-card {
            height: 50%;
        }
    }

    @media all and (max-width: 850px) and (max-height: 1200px) {
        &.ant-card {
            height: 40%;
        }
    }

    @media all and (max-width: 380px) and (max-height: 700px) {
        &.ant-card {
            width: 70%;
            height: 50%;
        }
    }

    @media all and (max-width: 500px) and (max-height: 750px) {
        &.ant-card {
            width: 70%;
            height: 50%;
        }
    }
`;

const CustomMeta = styled(Meta)`
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;

    @media all and (min-width: 450px) { 
        &.ant-card-meta {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            height: 6vh;
        }
    }

    @media all and (max-width: 450px) {
        &.ant-card-meta {
            height: 20%;
            display: flex;
            justify-content: center;
        }
    }
    
`;

const CustomCardButton = styled(Button)`
    background: #1976d2;
    height: 20%;
    width: 80%;
    border-radius: 20px;
    color: white;
    font-size: 120%;

    @media all and (max-width: 450px) {
        &.ant-btn {
            width: 50%;
            height: 50%;
            font-size: 13px;
        }
    }

    @media all and (min-width: 450px) {
        &.ant-btn {
            width: 30%;
        }
    }

    @media all and (max-width: 1024px) and (max-height: 1380px) {
        &.ant-btn {
            width: 60%;
            font-size: 12px;
        }
    }

    @media all and (max-width: 550px) and (max-height: 750px) {
        &.ant-btn {
            width: 60%;
            height: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

const CustomCard = () => {
  const { t } = useTranslation();

  const data = [
    {
      "name": "Positive",
      "scorePositive": 4000,
    },
    {
      "name": "Neutral",
      "scoreNeutral": 3000,
    },
    {
      "name": "Negative",
      "scoreNegative": 2000,
    }
  ]

  return (
    <CustomHistoryCard>
      <CustomMeta
        title="Card title"
      />
      <div className="scores">
        <div className="scoresContent">
          <div className="record">
            <p>{t('POSITIVE')}</p>
            <p>P</p>
          </div>

          <div className="record">
            <p>{t('NEUTRAL')}</p>
            <p>Ne</p>
          </div>

          <div className="record">
            <p>{t('NEGATIVE')}</p>
            <p>N</p>
          </div>
        </div>

        <div className="chart">
          <BarChart className="barChart" width={200} height={200} data={data}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="scorePositive" fill="green" />
            <Bar dataKey="scoreNeutral" fill="blue" />
            <Bar dataKey="scoreNegative" fill="red" />

          </BarChart>
        </div>
      </div>

      <div className="buttonDiv">
        <CustomCardButton>{t('SEE_MORE')}</CustomCardButton>
      </div>

    </CustomHistoryCard>
  );
}
export default CustomCard;