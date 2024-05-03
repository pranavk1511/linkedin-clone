'use server'

import { Post } from "@/mongodb/models/post"
import { IUser } from "@/types/user"
import { currentUser } from "@clerk/nextjs/server"


export default async function createPostAction(formData: FormData) {
    const user = await currentUser()
    if (!user) {
        throw new Error("User not authenticated")

    }
    const postInput = formData.get("postInput") as string;
    const image = formData.get("image") as File;

    let imageurl: string | undefined;
    if (!postInput) {
        throw new Error("Input is Required ");
    }

    const userDB: IUser = {
        userId: user.id,
        userImage: user.imageUrl,
        firstname: user.firstName || "Jhon", // Use optional chaining operator to handle null value
        lastname: user.lastName || "Doe", // Use optional chaining operator to handle null value
    };
    try {
        if (image.size > 0) {

        }
        else {
            const body = {
                user: userDB,
                text: postInput,
            }

            await Post.create(body);
        }
    }
    catch (error: any) {
        console.log("Failed to create post", error);
    }
};

