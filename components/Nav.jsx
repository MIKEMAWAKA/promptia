"use client"


import  Image  from 'next/image'
import Link from 'next/link'
import {useState,useEffect} from 'react'
import { useRouter } from 'next/router'

import {signIn,signOut,useSession,getProviders} from 'next-auth/react'



const Nav = () => {

    const isUserLogin = true;

    const [providers,setProviders] = useState(null);
    const [toggleDropDown,setToggleDropdown]= useState(false)

    useEffect(()=>{
        const setProviders = async ()=>{
            const response = await getProviders();
            setProviders(response)
        }


    },[])


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image width={30} height={30}
            src='/assets/images/logo.svg' className='object-contain'
            />
            <p className='logo_text'>PromptSearch</p>
        </Link>

        <div className='sm:flex hidden'>
            {isUserLogin?(
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt' className='black_btn'>
                        Create Post
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>

                    <Link href='/profile'>
                        <Image src='/assets/images/logo.svg' height={37} width={37}
                        className='rounded-full'
                         />
                    </Link>
                </div>
            ):(
                <>
                {
                    providers&&
                    Object.values(providers).map((provider)=> (
                        <button className='black_btn' type='button' key={provider.name}
                        onClick={()=>signIn(provider.id)}> 
                        Sign In

                        </button>
                    ))
                }

                </>
            )}


        </div>
        <div className='sm:hidden flex relative'>
        {isUserLogin?(
                <div className='flex'>
               
                   
                        <Image src='/assets/images/logo.svg' height={37} width={37}
                        className='rounded-full' alt='profile'
                        onClick={()=>setToggleDropdown((prev)=>!prev)}
                       
                         />
                         {toggleDropDown &&(
                            <div className='dropdown'>
                                <Link href='/profile' className='dropdown_link'
                                onClick={()=>setToggleDropdown(false)}>
                                    My Profile

                                </Link>
                                <Link href='/create-prompt' className='dropdown_link'
                                onClick={()=>setToggleDropdown(false)}>
                                    Create Prompt

                                </Link>
                                <button type='button' className='mt-5 w-full black_btn'
                                onClick={()=>{
                                    setToggleDropdown(false);
                                    signOut();
                                }}>
                                    Sign Out

                                </button>

                            </div>
                         )}
                   
                </div>
            ):(
                <>
                {
                    providers&&
                    Object.values(providers).map((provider)=> (
                        <button className='black_btn' type='button' key={provider.name}
                        onClick={()=>signIn(provider.id)}> 
                        Sign In

                        </button>
                    ))
                }

                </>
            )}

        </div>

    </nav>
  )
}

export default Nav