import { useTranslation } from 'react-i18next';
import notfound from '../assets/notFound.png'

const PageNotFound = () => {
  const { t } = useTranslation();

  document.title='Style Share | Nothing here 🫗'

  return (
    <div className='flex flex-col items-center justify-center mx-auto'>
        <img src={notfound} alt='Page Not Found' className='w-[400px]' /> 
        <p className='text-center mb-20'>
            <span className='text-red-600 font-bold text-6xl'>404</span><br />
            <span className='text-gray-200 ite text-3xl font-semibold'>{t('notfound')}</span>
        </p>    
    </div>
  )
}

export default PageNotFound
