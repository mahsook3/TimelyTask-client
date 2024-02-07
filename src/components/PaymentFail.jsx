import fail from '../assets/icons/payment_fail.png'

const PaymentFail =() =>{
    return (
    <div className='flex flex-col justify-center items-center h-[100vh]'>
        <div className=' text-xl font-bold m-5 text-red-400'>Payment Failed</div>
        <img src={fail} alt="success" width={"300"} height={"300"} />
    </div>
    )
};

export default PaymentFail;