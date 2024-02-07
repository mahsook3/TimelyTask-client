import success from '../assets/icons/payment_success.gif'

const PaymentSuccess =() =>{
    return (
        <div className='flex flex-col justify-center items-center h-[100vh]'>
            <div className=' text-xl font-bold m-5 text-green-400'>Payment Success</div>
            <img src={success} alt="success" width={"300"} height={"300"} />
        </div>
    )
};

export default PaymentSuccess;