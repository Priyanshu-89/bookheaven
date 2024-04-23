
import Dbconnect from '../../../libs/Dbconnect';
import UserSchema from '../../../models/UserSchema';

async function UsersPage() {
    await Dbconnect()
    let callInfo = await UserSchema.find().lean();
   

    return (
        <div className='flex gap-2 flex-col max-w-6xl mx-auto'>
            <div className="flex justify-around mt-2 items-center">
                <h2 className='text-xl font-semibold text-cyan-700 ml-6'>Manage Users({callInfo.length})</h2>

            </div>
            <div className="flex gap-2 justify-around">
                <div className="w-2/3 mt-3 ml-2">
                    <table className='border w-full'>
                        <thead>
                            <tr>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Id</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Name</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Contact</th>
                                <th className='border border-cyan-700 text-cyan-700 text-base p-2'>Email</th>
                
                            </tr>
                        </thead>
                        <tbody>
                            {callInfo.map((user, i) => {

                                return (
                                    <tr key={i}>
                                        <td className='border p-2'>{i + 1}</td>
                                        <td className='border p-2'>{user.name}</td>
                                       
                                        <td className='border p-2'>{user.contact}</td>
                                        <td className='border p-2'>{user.email}</td>
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

export default UsersPage;

