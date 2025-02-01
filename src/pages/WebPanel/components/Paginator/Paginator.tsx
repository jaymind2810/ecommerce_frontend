import React from "react";

interface PagiantorProps {
    totalPages: number;
    setCurrentPage:(value: number) => void;
    currentPages: number;
}


const Paginator:React.FC<PagiantorProps> = ({
    totalPages,
    setCurrentPage,
    currentPages,
}) => {

    const renderPages = () => {
        const items = [];
    
        items.push(
          <li
            onClick={() => setCurrentPage(currentPages - 1)}
          >
            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
            </a>
          </li>
        )
    
        for (let i = 0; i < totalPages; i++) {

            if ((i == currentPages) || (i+1 == currentPages) || (i+2 == currentPages)) {
                items.push(
                  <li 
                    key={i}
                    onClick={() => setCurrentPage(i+1)}
                  >
                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i + 1}</a>
                  </li>
                );
            }
        }
    
        items.push(
          <li
            onClick={() => setCurrentPage(currentPages + 1)}
          >
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
            </a>
          </li>
        )
    
        return items;
    };


    return (
        <>
            <div className="justify-self-center">
                <nav className="py-6">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        {renderPages()}            
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Paginator