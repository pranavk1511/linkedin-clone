'use server'

import { currentUser } from "@clerk/nextjs/server"


export default async function createPostAction(formData:FormData) {
    const user = await currentUser()
    if (!user){
        throw new Error("User not authenticated")

    }
    const postInput = formData.get("postInput") as String
    const image = formData.get("image") as File

    let imageurl: string | undefined

    if (!postInput){
        throw new Error("Input is Required ")
    }
    
};

