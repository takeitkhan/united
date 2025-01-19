import React from 'react'

const Loading = () => {
    return (
        <>
            <div className='container mx-auto py-10'>
                <div className='flex'>
                    <div className=" flex  animate-pulse gap-2 p-4">
                        <div className="h-20 w-20 rounded-md bg-slate-400"></div>
                    </div>

                    <div className=" flex animate-pulse gap-2 p-4">
                        <div className="h-20 w-20 rounded-md bg-slate-400"></div>
                    </div>

                    <div className=" flex animate-pulse gap-2 p-4">
                        <div className="h-20 w-20 rounded-md bg-slate-400"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading
