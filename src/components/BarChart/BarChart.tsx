import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'; 

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const transformDataForBarChart = (data) => {
    const categoryData = data.reduce((acc, item) => {
        acc[item["Category"]] = (acc[item["Category"]] || 0) + Number(item["Sales"]);
        return acc;
    }, {});

    return {
        labels: Object.keys(categoryData),
        datasets: [
            {
                label: 'Sales by Category',
                data: Object.values(categoryData),
                backgroundColor: 'rgba(75,192,192,0.6)',
            },
        ],
    };
};
const BarChartComponent = ({ data }) => {
    const barChartData = transformDataForBarChart(data);

    return (
        <div>
            <h3>Bar Chart</h3>
            <Bar data={barChartData} />
        </div>
    );
};

export default BarChartComponent;