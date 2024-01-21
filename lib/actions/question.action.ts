"use server";

import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";



export async function createQuestion(params: any) {
  try {
    // connect db
    connectToDatabase();
    const { title, content, tags, author, path } = params;

    // create question
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments=[]

    // create tags 
    for (const tag of tags) {
        const existingTag = await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, "i") } },
          { $setOnInsert: { name: tag }, $push: { questions: question._id } },
          { upsert: true, new: true }
        );
  
        tagDocuments.push(existingTag._id);
      } 
      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: tagDocuments } },
      });

    //   create an interation record for users ask question

    // increment user's reputation by 5

  } catch (error) {

  }

}
