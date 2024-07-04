import notfound from '../assets/notFound.png'

const PageNotFound = () => {

  document.title='Style Share | Nothing here 🫗'

  return (
    <div className='h-screen flex flex-col items-center justify-center mx-auto text-[#000435] bg-[#000435]'>
        <img src={notfound} alt='Page Not Found' className='w-[400px]' /> 
        <p className='text-center mb-20'>
            <span className='text-red-600 font-bold text-6xl'>404</span><br />
            <span className='text-gray-200 ite text-3xl font-semibold'>Page Not Found</span>
        </p>    
    </div>
  )
}

export default PageNotFound
