import React from 'react'

 
const ColumnName = ( {props}:any) => {
	return (
        <>    
            <td scope="col" className="px-6 py-4">
                {props.name}
            </td>
        </>
        
	)
}

export default ColumnName


// const HeaderColumnName = ( {props}:any) => {
// 	return (
//         <>    
//             <th scope="col" className="px-6 py-3">
//                 {props.name}
//             </th>
//         </>
        
// 	)
// }

// export default HeaderColumnName