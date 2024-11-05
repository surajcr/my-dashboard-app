import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChartComponent = ({ data }) => {
    const transformDataForLineChart = () => {
        const salesData = data.map(item => ({
            date: new Date(item["Order Date"]),
            sales: Number(item["Sales"]),
        }));

        const groupedByDate = salesData.reduce((acc, curr) => {
            const dateStr = curr.date.toLocaleDateString();
            acc[dateStr] = (acc[dateStr] || 0) + curr.sales;
            return acc;
        }, {});

        return {
            labels: Object.keys(groupedByDate),
            datasets: [
                {
                    label: 'Sales',
                    data: Object.values(groupedByDate),
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    fill: true,
                },
            ],
        };
    };

    const lineChartData = transformDataForLineChart();

    return (
        <div>
            <h3>Line Chart</h3>
            <Line data={lineChartData} />
        </div>
    );
};

export default LineChartComponent;