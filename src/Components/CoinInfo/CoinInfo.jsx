import { Line } from "react-chartjs-2";
import { CategoryScale } from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);
function CoinInfo({ historicData, setDays, setCoinInterval, days, currency }) {
    const chartDays = [
        {
            label: "24 Hours",
            value: 1
        },
        {
            label: "30 Days",
            value: 30
        },
        {
            label: "90 Days",
            value: 90
        },
        {
            label: "365 Days",
            value: 365
        },
    ];

    function handleDayChange(e) {
        const selectedValue = parseInt(e.target.value); // Convert to number
        console.log("Selected Days:", selectedValue);

        if (selectedValue === 1) {
            setCoinInterval(''); // For 24 hours
        } else {
            setCoinInterval('daily'); // For other periods
        }

        setDays(selectedValue); // Update the `days` state
    }



    if (!historicData) {
        return <div>No Data Available</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center mt-6 p-6 w-full">
            <div className="h-[500px] w-full">
                <Line 
                    data={{
                        labels: historicData.prices.map(coinprice => {
                            let date = new Date(coinprice[0]);
                            let time = date.getHours() > 12 
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM` 
                                : `${date.getHours()}:${date.getMinutes()} AM`;

                            return days === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets: [{
                            label: `Price Past ${days} Days in ${currency.toUpperCase()}`,
                            data: historicData.prices.map(coinprice => coinprice[1])
                        }]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        elements: {
                            point: {
                                radius: 0
                            }
                        }
                    }}
                />
            </div>

            <div className="flex justify-center mt-5 w-full">
                <select 
                    className="border border-gray-300 rounded-md p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={days} // Bind the value to `days` state
                    onChange={handleDayChange}
                >
                    {chartDays.map((day, index) => (
                        <option selected={days===day.value} key={index} value={day.value}> {day.label} </option>// key is for uniquely identifying each list item
                    ))}
                </select>
            </div>
        </div>
    );
}

export default CoinInfo;
