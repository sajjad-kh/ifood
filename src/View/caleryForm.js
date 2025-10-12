import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import client from "../api/client";
import ViewForm from "./ViewForm";

import CaloriesCompareChart from "./chart/CaloriesCompareChart";
import CaloriesPieChart from "./chart/CaloriesPieChart";

const CaleryForm = ({ date }) => {
	const { t, i18n } = useTranslation();
	const lang = i18n.language || "fa";

	const [showViewForm, setShowViewForm] = useState(false);
	const [requiredCalories, setRequiredCalories] = useState(0);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const faFormatter = new Intl.NumberFormat("fa-IR");

	useEffect(() => {
		const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await client.get(`/${lang}/consumed_calories.json`, { params: { date } });
			setRequiredCalories(res.calories_required || "");
			setOrders(res.orders);
		} catch {
			setError(t("fetchError"));
		} finally {
			setLoading(false);
		}
		};
		fetchData();
	}, []);

	const totalOrderCalories = orders.reduce(
		(sum, { count = 0, takeaway_count = 0, food_profile }) =>
		sum + (count + takeaway_count) * (food_profile?.calory || 0),
		0
	);

	const groupedOrders = orders.reduce((groups, order) => {
		const placeId = order.delivery_place_id || "unknown";
		(groups[placeId] = groups[placeId] || []).push(order);
		return groups;
	}, {});

	if (showViewForm) return <ViewForm date={date} />;

return (
	<div className="flex flex-col h-full max-h-[90vh] text-xs p-2 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:hidden">
		<div className="bg-white p-1 rounded shadow-md flex gap-2">
			<button className="px-2 p-1 rounded text-gray-400 flex-1" onClick={() => setShowViewForm(true)}>
			{t("viewFood")}
			</button>
			<button className="px-4 py-2 rounded bg-irancell text-white flex-1">
			{t("viewCalories")}
			</button>
		</div>

		<div className="bg-white rounded-md shadow-md p-3 space-y-3 h-full">
			{loading && <div>{t("loading")}</div>}
			{error && <div className="text-red-500">{error}</div>}

			<div className="w-full flex-row items-center p-2 rounded">
			<p className="font-bold w-full my-2">{t("bmrInfo")}</p>
			<p className="w-full my-2">{t("updateProfile")}</p>
			</div>

			<div className="flex flex-col md:flex-row gap-4 w-full p-2 text-gray-400 text-center">
				<div className="lg:w-6/12 sm:w-full">
					<CaloriesCompareChart orders={orders} requiredCalories={requiredCalories}/>
				</div>
				<div className="lg:w-6/12 sm:w-full">
					<div className="w-full">
        				<CaloriesPieChart orders={orders} />
					</div>
				</div>
			</div>

			<div className="w-full p-2 space-y-2">
			{Object.entries(groupedOrders).map(([placeId, placeOrders]) => (
				<div key={placeId} className="p-1 space-y-1">
				<p className="font-semibold text-sx text-gray-700">
					<span
					className="w-3 h-3 rounded-full inline-block ml-1"
					style={{ backgroundColor: placeOrders[0]?.meal_color || "#ccc" }}
					/>
					{placeOrders[0]?.meal}
				</p>
				{placeOrders.map((order, idx) => (
					<div key={idx} className="flex justify-between items-center pb-1 text-sx text-center">
						<span className="w-7/12 text-right">{order.food_name || t("noName")}</span>
						<span className="w-4/12">
							<span className="text-[8px] text-gray-400 mx-2">{t("inRestaurant")}</span>
							{faFormatter.format(order.count || 0)}
							<span className="text-[8px] text-gray-400 mx-2">{t("takeaway")}</span>
							{faFormatter.format(order.takeaway_count || 0)}
						</span>
						<span className="w-2/12 text-left">{faFormatter.format(order.food_profile?.calory) || 0}</span>
					</div>
				))}
				</div>
			))}
			</div>

			<div className="w-full p-2 border-t border-gray-300 space-y-2">
			<div className="w-full flex justify-between items-center">
				<span className="font-bold">{t("totalOrdersCalories")}</span>
				<span className={(totalOrderCalories||0) > (requiredCalories||0) ? "text-red-400" : "text-green-700"}>
				{faFormatter.format(totalOrderCalories)}
				</span>
			</div>
			<div className="w-full flex justify-between items-center">
				<span className="font-bold">{t("totalRequiredCalories")}</span>
				<span>{faFormatter.format(requiredCalories || 0)}</span>
			</div>
			</div>
		</div>
	</div>
);
};

export default CaleryForm;
