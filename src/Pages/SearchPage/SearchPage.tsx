import React, { ChangeEvent, SyntheticEvent, useState, useEffect, useCallback } from 'react';
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import debounce from 'lodash.debounce';

interface Props {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        const exist = portfolioValues.find((value) => value === e.target[0].value);
        if (exist) {
            setServerError('Company already in portfolio');
            return;
        }
        const updatedPortfolio = [...portfolioValues, e.target[0].value];
        setPortfolioValues(updatedPortfolio);
    };

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        const removed = portfolioValues.filter((value) => value !== e.target[0].value);
        setPortfolioValues(removed);
    };

    const performSearch = async (query: string) => {
        const result = await searchCompanies(query);
        if (typeof result === 'string') {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
        }
        console.log(searchResult);
    };

    const debouncedSearch = useCallback(debounce((query: string) => performSearch(query), 300), []);

    useEffect(() => {
        if (search) {
            debouncedSearch(search);
        }
    }, [search, debouncedSearch]);

    const onSearchSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        debouncedSearch(search);
    };

    return (
        <div className="App">
            <Search
                onSearchSubmit={onSearchSubmit}
                search={search}
                handleSearchChange={handleSearchChange}
            />
            <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete} />
            <CardList
                searchResults={searchResult}
                onPortfolioCreate={onPortfolioCreate}
            />
            {serverError && <h1>{serverError}</h1>}
        </div>
    );
};

export default SearchPage;
