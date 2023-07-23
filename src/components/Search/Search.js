import React from 'react';

const Search = () => {
    return (
        <div>
            <div className="join">
                <div>
                    <div>
                        <input className="input input-bordered join-item" placeholder="Search" />
                    </div>
                </div>

                <div className="indicator">
                    <button className="btn btn-outline btn-secondary join-item">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Search;