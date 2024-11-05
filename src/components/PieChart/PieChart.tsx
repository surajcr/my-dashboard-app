import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const PieChartComponent = ({ data }) => {
    const transformDataForPieChart = () => {
        const categoryData = data.reduce((acc, item) => {
            acc[item["Category"]] = (acc[item["Category"]] || 0) + Number(item["Sales"]);
            return acc;
        }, {});

        return {
            labels: Object.keys(categoryData),
            datasets: [
                {
                    data: Object.values(categoryData),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                    ],
                },
            ],
        };
    };
    const pieChartData = transformDataForPieChart();
    return (
        <div>
            <h3>Pie Chart</h3>
            <Pie data={pieChartData} />
        </div>
    );
};

export default PieChartComponent;