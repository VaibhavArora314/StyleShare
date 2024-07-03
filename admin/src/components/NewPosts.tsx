import { PiNewspaperClippingLight } from "react-icons/pi"

const NewPosts = () => {
    return (
      <div>
        <div> 
        <span className="flex items-center mx-24 lg:mr-11 text-xl font-bold mt-3 decoration-sky-500 decoration-dotted underline">
        <div className='inline-block p-2 text-white bg-[#000435] rounded-lg mr-2'>
            <PiNewspaperClippingLight size={23}/>
        </div>
            New Posts
        </span>
    </div>
  <div className="lg:mx-24 mx-10 mt-4 lg:mr-11  overflow-x-auto shadow-md rounded-xl mb-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-sky-500">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Author
                  </th>
                  <th scope="col" className="px-6 py-3">
                      createdAt
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Likes
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Comments
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                  <td className="px-8 py-4 font-semibold text-white">
                      Navbar component
                  </td>
                  <th className="flex items-center px-6 py-5 text-white">
                  <div>
                    <div className="text-base font-bold">Neil Sims</div>
                    <div className="font-medium text-gray-300 ">neil.sims@flowbite.com</div>
                  </div>  
                  </th>
                  <td className="px-3 py-4 font-semibold">
                      10th June 2024
                  </td>
                  <td className="px-8 py-4  font-semibold">
                    7
                  </td>
                  <td className="px-12 py-4  font-semibold">
                    7
                  </td>
                  <td className="px-2 py-4 ">
                  <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                    Manage
                  </button>
                  </td>
              </tr>
              <tr className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                  <td className="px-8 py-4 font-semibold text-white">
                      Navbar component
                  </td>
                  <th className="flex items-center px-6 py-5 text-white">
                  <div>
                    <div className="text-base font-bold">Neil Sims</div>
                    <div className="font-medium text-gray-300 ">neil.sims@flowbite.com</div>
                  </div>  
                  </th>
                  <td className="px-3 py-4 font-semibold">
                      10th June 2024
                  </td>
                  <td className="px-8 py-4  font-semibold">
                    7
                  </td>
                  <td className="px-12 py-4  font-semibold">
                    7
                  </td>
                  <td className="px-2 py-4 ">
                  <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                    Manage
                  </button>
                  </td>
              </tr>
          </tbody>
        </table>
        </div>
      </div>
    )
  }
  
  export default NewPosts
  