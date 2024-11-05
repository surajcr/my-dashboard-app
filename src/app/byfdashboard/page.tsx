"use client"; // This makes the file a client component
import { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, ArcElement } from 'chart.js'; // Import ArcElement
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Papa from 'papaparse'; 
import BarChartComponent from '../../components/BarChart/BarChart';
import LineChartComponent from '../../components/LineChart/LineChart';
import PieChartComponent from '../../components/PieChart/PieChart';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, ArcElement); // Register ArcElement

const Dashboard = () => {
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchData(token);
        }
    }, [router]);

    const fetchData = async (token: string) => {
        try {
            const response = await axios.get('https://interview.bigyellowfish.io/api/Content/GetCSVData', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const csvData = response.data;
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setData(results.data);
                    console.log('Parsed Data:', results.data);
                },
                error: (error) => {
                    console.error('Error parsing CSV data:', error);
                    setError('Failed to parse CSV data');
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (loading) return <div>Loading BYF Sales Data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container-fluid ">

            <div className="row">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">BYF </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Analytics Dashboard </a>
                        </li>

                    </ul>
                    <form className="d-flex">
                        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
            </div> 
            <main>
            <div className="row ">  
                <div className="pageTitleMain">
                    <div className="container">
                        <h1>Dashboard</h1>
                    </div>
                </div>    
            </div>
            <div className="container pageContentMain ">
            <div className='row '>                
                <div className='col-md-8 col-12 py-4'>
                    <h2>Sales Trend Over Time</h2>
                    <LineChartComponent data={data} />
                </div>
                <div className='col-md-4 col-12 py-4'>
                    <h2>Sales Distribution by Category</h2>
                    <PieChartComponent data={data} />
                </div>
                <div className='col-md-8 col-12 py-4'>
                    <h2>Sales by Category</h2>
                    <BarChartComponent data={data} />
                </div>
            </div>
            </div>      
            </main>

        </div>
    );
};

export default Dashboard;