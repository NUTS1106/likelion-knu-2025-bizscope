import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

const data = [
  { name: "Jan", growth: 10 },
  { name: "Feb", growth: 15 },
  { name: "Mar", growth: 20 },
  { name: "Apr", growth: 18 },
  { name: "May", growth: 25 },
  { name: "Jun", growth: 22 },
];

const competitorData = [
  { name: "Company A", value: 400 },
  { name: "Company B", value: 300 },
  { name: "Company C", value: 200 },
  { name: "Company D", value: 100 },
];

export default function ChartPage() {
  return (
    <Wrap>
      <Title>Business Report</Title>

      {/* 위 카드들 */}
      <CardRow>
        <Card>
          <CardTitle>Revenue Growth</CardTitle>
          <CardText>Current Quarter: 15% increase</CardText>
          <CardText>Compared to Last Quarter</CardText>
        </Card>
        <Card>
          <CardTitle>Customer Retention</CardTitle>
          <CardText>Current Rate: 75%</CardText>
          <CardText>Target: 80% by Next Quarter</CardText>
        </Card>
        <Card>
          <CardTitle>Market Share</CardTitle>
          <CardText>Current: 12%</CardText>
          <CardText>Goal: 15% by End of Year</CardText>
        </Card>
      </CardRow>

      {/* 차트 부분 */}
      <CardRow>
        <BigCard>
          <CardTitle>Business Growth Over Time</CardTitle>
          <LineChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="growth" stroke="#007bff" />
          </LineChart>
        </BigCard>
        <BigCard>
          <CardTitle>Competitor Analysis</CardTitle>
          <BarChart width={300} height={200} data={competitorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#007bff" />
          </BarChart>
        </BigCard>
      </CardRow>

      {/* 추천 부분 */}
      <WideCard>
        <CardTitle>Strategic Recommendations</CardTitle>
        <CardText>
          Based on the current data, it is recommended to enhance customer
          engagement strategies to reach the retention target. Additionally,
          explore new markets to increase market share.
        </CardText>
        <ul>
          <li>Invest in customer loyalty programs.</li>
          <li>Expand online marketing efforts.</li>
          <li>Consider partnerships with local businesses.</li>
        </ul>
      </WideCard>
    </Wrap>
  );
}

/* styled-components */
const Wrap = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 8px;
`;

const CardRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  flex: 1;
  background: #e0f0ff;
  border-radius: 12px;
  padding: 16px;
`;

const BigCard = styled(Card)`
  background: #e5e7eb;
  flex: 1;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WideCard = styled(Card)`
  background: #e0f0ff;
  width: 100%;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`;

const CardText = styled.p`
  font-size: 14px;
  margin: 4px 0;
`;
