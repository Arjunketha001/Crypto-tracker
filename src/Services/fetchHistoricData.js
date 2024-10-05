import axiosInstance from "../Helpers/axiosInstance";

export async function fetchCoinHistoricData(id, interval, days = 7, currency = 'usd') {
    try {
        const response = await axiosInstance.get(
            `/coins/${id}/market_chart?days=${days}&vs_currency=${currency}&interval=${interval}`
        );

        // Check if the response data exists and return it
        if (response && response.data) {
            return response.data;
        } else {
            console.error("No data in response");
            return null;
        }
    } catch (error) {
        console.error("Error fetching historic data:", error);
        return null;
    }
}
