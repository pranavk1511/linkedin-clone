'use client'

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";

function PostForm() {
    const ref = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = useUser();
    return (
        <div>
            <form action=''>
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>
                            {user?.firstName?.charAt(0)}
                            {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <input
                        type="text"
                        name="postInput"
                        placeholder="Start writing a post"
                        className="flex-1 outline-none rounded-full py-3 px-4 border"
                    />
                    <input type="file" name="image" accept="image/*" hidden />

                    <button type="submit" hidden>Post</button>
                         {/* conditional preview */}
                    <div>
                        <Button>
                            <ImageIcon className="mr-2" size={16} color="currentColor" />
                            Add
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostForm