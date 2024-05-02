import { IUser } from "@/types/user";
import mongoose , {Schema,Document,models,Model} from "mongoose";
import { IComment } from "./comment";
import { IPost } from "./post";

export interface IpostBase {
    user:IUser;
    text:string;
    imageUrl?:string;
    coments?:IComment[];
    likes?:string[];
}


export interface IPost extends Document,IpostBase {
    createdAt:Date;
    updatedAt:Date;
}

interface IpostMethods {
    likePost(userId:string):Promise<void>;
    unlikePost(userId:string):Promise<void>;
    commentPost(comment:IComment):Promise<void>;
    getAllComments():Promise<IComment[]>;
    removePost():Promise<void>;
}



interface IpostStatics {
    getAllPosts(): Promise<IPostDocument>;
}

export interface IPostDocument extends IPost,IpostStatics{}
interface IPostModel extends IpostStatics, Model<IPostDocument>{}

const postSchema = new Schema<IPost>(
