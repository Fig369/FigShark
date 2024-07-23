import React, { SyntheticEvent } from 'react'
import './Card.css'
import { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';

interface Props {
    id: string;
    searchResult:CompanySearch;
    onPortfolioCreate: (e:SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({ id, searchResult, onPortfolioCreate }: Props): JSX.Element => {

    return (
        <div className="col">
            <div className="card">
                <div className="image-container">
                    <img src="https://picsum.photos/200" alt="company logo" />
                </div>
                <div className="card-content">
                    <h2>{searchResult.name} - ({searchResult.symbol})</h2>
                    <p>${searchResult.currency}</p>
                    <p className='details'>
                        {searchResult.exchangeShortName} - {searchResult.stockExchange}
                    </p>
                    <AddPortfolio 
                    onPortfolioCreate={onPortfolioCreate}
                    symbol={searchResult.symbol}
                    />
                </div>
            </div>
        </div>
    );
}

export default Card