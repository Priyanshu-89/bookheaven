
import Dbconnect from '@/app/libs/Dbconnect';
import Order from '@/app/models/Order';


async function OrdersPage() {
    await Dbconnect()
    let callOrders = await Order.find({"ordered":true}).populate('userId');
   

    return (
        <div className='flex gap-2 flex-col max-w-6xl mx-auto'>
            <div className="flex justify-around mt-2 items-center">
                <h2 className='text-xl font-semibold text-cyan-700 ml-6'>Manage Orders({callOrders.length})</h2>

            </div>
            <div className="flex gap-2 justify-around">
                <div className="w-2/3 mt-3 ml-2">
                    <table className='border w-full'>
                        <thead>
                            <tr>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Id</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>User</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Date</th>

                
                            </tr>
                        </thead>
                        <tbody>
                            {callOrders.map((order, i) => {

                                return (
                                    <tr key={i}>
                                        <td className='border p-2'>{i + 1}</td>
                                        <td className='border p-2'>{order.userId.name}</td>
                                       

                                        <td className='border p-2'>{order.orderDate.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage;

