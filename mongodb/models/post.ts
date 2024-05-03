import { IUser } from "@/types/user";
import mongoose , {Schema,Document,models,Model} from "mongoose";
import { Comment,IComment,ICommentBase } from "./comment";


export interface IpostBase {
    user:IUser;
    text:string;
    imageUrl?:string;
    comments?:IComment[];
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

const PostSchema = new Schema<IPostDocument>({
    user:{
        userId:{type:String,required:true},
        userImage:{type:String,required:true},
        firstName:{type:String,required:true},
        lastName:{type:String},
    },
    text:{type:String,required:true},
    imageUrl:{type:String},
    comments:[{type:Schema.Types.ObjectId,ref:"Comment",default:[]}],
    likes:[{type:String}],
},
{
    timestamps:true
});

PostSchema.methods.likePost = async function(userId:string){
    try {
        await this.updateOne({$addToSet:{likes:userId}});
    } catch (error) {
       console.log("Failed to like post thr post",error);
    }
}

PostSchema.methods.unlikePost = async function(userId:string){
    try {
        await this.updateOne({$pull:{likes:userId}});
    } catch (error) {
        console.log("Failed to unlike post",error);
    }
}

PostSchema.methods.removePost = async function(){
    try {
        await this.model("Post").deleteOne({_id:this._id});
    } catch (error) {
        console.log("Failed to remove post",error);
    }
}

PostSchema.methods.commentPost = async function(commentoAdd:IComment){
    try {
        const comment = await Comment.create(commentoAdd);
        this.comments.push(comment._id);
        await this.save();
    } catch (error) {
        console.log("Failed to comment post",error);
    }
}

PostSchema.methods.getAllComments = async function(){
    try {
        await this.populate({
            path:"comments",
            options:{sort:{createdAt:-1}} // sort comments by createdAt in descending order
        })
    } catch (error) {
        console.log("Failed to get all comments",error);
    }
}

PostSchema.statics.getAllPosts = async function(){
    try {
        const posts = await this.find().
        sort({createdAt:-1}).
        populate({
            path:"comments",
            options:{sort:{createdAt:-1}}}
            ).lean();

        return posts.map((post:IPostDocument) => ({
            ...post,
            _id:post._id.toString(),
            comments:post.comments?.map((comment:IComment) => ({
                ...comment,
                _id:comment._id.toString(),

            })),
        }));
    } catch (error) {
        console.log("Failed to get all posts",error);
    }
}

export const Post = models.Post as IPostModel || mongoose.model<IPostDocument,IPostDocument>("Post",PostSchema);