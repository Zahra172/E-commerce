import  MyIcon  from '../../assets/Oops! 404 Error with a broken robot-rafiki.svg'; 

export default function Notfound() {
  return (
    <div className='w-full flex justify-center'>
      <img src={MyIcon} width={700} alt='not found '></img>
      
    </div>
  );
}