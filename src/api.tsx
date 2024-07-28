import axios from "axios";
import {
    CompanyBalanceSheet,
    CompanyCashFlow,
    CompanyCompData,
    CompanyIncomeStatement,
    CompanyKeyMetrics,
    CompanyProfile,
    CompanySearch,
    CompanyTenK
} from "./company";

export interface SearchResponse {
    data: CompanySearch[];
}

// Simple in-memory cache
const cache: { [key: string]: any } = {};

const fetchData = async (key: string, url: string) => {
    if (cache[key]) {
        return cache[key];
    }

    const response = await axios.get(url);
    cache[key] = response.data;
    return response.data;
};

export const searchCompanies = async (query: string) => {
    try {
        const url = `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`;
        const data = await fetchData(query, url);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error has occurred.";
        }
    }
};

export const getCompanyProfile = async (query: string) => {
    try {
        const url = `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`;
        return await fetchData(query, url);
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getKeyMetrics = async (query: string) => {
    try {
        const url = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`;
        return await fetchData(query, url);
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getIncomeStatement = async (query: string) => {
    try {
        const url = `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=50&apikey=${process.env.REACT_APP_API_KEY}`;
        return await fetchData(query, url);
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getBalanceSheet = async (query: string) => {
    try {
        const url = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=20&apikey=${process.env.REACT_APP_API_KEY}`;
        return await fetchData(query, url);
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getCashFlow = async (query: string) => {
    try {
        const url = `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=100&apikey=${process.env.REACT_APP_API_KEY}`;
        return await fetchData(query, url);
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getCompData = async (query: string) => {
    try {
        const url = `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`;
        return await fetchData(query, url);
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getTenK = async (query: string) => {
    try {
        const url = `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-K&page=0&apikey=${process.env.REACT_APP_API_KEY}`;
        return await fetchData(query, url);
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};
