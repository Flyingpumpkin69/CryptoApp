import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;

const CryptoDetails = () => {
  const { coinuuid } = useParams();

  const { data, isFetching } = useGetCryptoDetailsQuery(coinuuid);

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "Loading...";

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "Percentage Of Change",
      value: ` ${cryptoDetails?.change && millify(cryptoDetails?.change)} % `, //showing error here
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-details-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in US Dollars. view value
          stastics,marketcap and supply
        </p>
      </Col>

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value=statistics-heading">
            <Title level={3} className="coin-detailes-heading">
              {cryptoDetails?.name} Value statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value=statistics-heading">
            <Title level={3} className="coin-detailes-heading">
              Other statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Col className="coin-desc">
          <div>
            <Title level={6} className="coin-details-heading">
              What is {cryptoDetails?.name} ?
            </Title>

            {typeof cryptoDetails?.description === "string" ? (
              <p>{HTMLReactParser(cryptoDetails?.description)}</p>
            ) : (
              <p>No description available.</p>
            )}
          </div>
        </Col>
      </Col>

     
      <Col className="coin-link">
        <Title level={5} className="coin-details-heading">
          {cryptoDetails?.name} Links
        </Title>

        {cryptoDetails.links.map((link) => (
          <Row className="coin-link" key={link.name}>
            <Title level={5} className="link-name">
              {link.type}
            </Title>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.name}
            </a>
          </Row>
        ))}
      </Col>
    </Col>
  );
};

export default CryptoDetails;
