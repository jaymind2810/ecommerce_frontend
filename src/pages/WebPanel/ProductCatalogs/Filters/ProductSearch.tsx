import React, { useEffect, useState } from 'react';
import _ from 'lodash';

interface SearchBarProps {
    onSearch: any
}

const SearchBar:React.FC<SearchBarProps> = ({ 
    onSearch, 
}) => {
    const [query, setQuery] = useState('');

    const debouncedSearch = _.debounce((searchTerm:any) => {
        onSearch(searchTerm);
    }, 500); 

    useEffect(() => {
        debouncedSearch(query);
        return () => debouncedSearch.cancel(); // Cleanup debounce on unmount
    }, [query]);

    return (
        <div>
            <form className="max-w-md mx-auto">   
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="block w-full p-1.5 ps-10 text-sm text-gray-600 border-gray-300 rounded-lg bg-gray-100 
                            focus:ring-blue-500 focus:border-primary-500 
                            dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-60 dark:focus:border-primary-500" 
                        placeholder="Search Products..." 
                        required />
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
