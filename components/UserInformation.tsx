import { currentUser } from "@clerk/nextjs/server"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import React from 'react';
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";


async function UserInformation() {
    const User = await currentUser();
    const firstname = User?.firstName;
    const lastname = User?.lastName;
    return (
        <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
            <Avatar>
                {User?.id ? (
                    <AvatarImage src={User?.imageUrl} />
                ) : (<AvatarImage src="https://www.github.com/shadcn.png" />)

                }
                <AvatarFallback>
                    {firstname?.charAt(0)}
                    {lastname?.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <SignedIn>
                <div className="text-center">
                    <p className="semi-bold">
                    {firstname}
                    {lastname}
                    </p>
                    <p className="text-xs">
                        @{firstname}
                         {lastname}-{User?.id?.slice(-4)}
                    </p>
                </div>
            </SignedIn>
            <SignedOut>
                <div className="text-center space-y-2">
                    <p className="font-semibold">You are not signed In </p>   
                <Button asChild className="bg-[#0B63C4] text-white">
                    <SignInButton >Sign In</SignInButton>
                </Button>
                </div>
            </SignedOut>
            <hr className="w-full border-gray-200 my-5"/>

            <div className="flex justify-between w-full px-4 text-sm">
                <p className="font-semibold text-gray-400">Posts</p>
                <p className="text-blue-400">0</p>
            </div>

            <div className="flex justify-between w-full px-4 text-sm">
                <p className="font-semibold text-gray-400">Comments</p>
                <p className="text-blue-400">0</p>
            </div>

        </div>
    )
}

export default UserInformation