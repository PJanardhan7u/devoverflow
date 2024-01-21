"use server";

import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import {
    CreateQuestionParams,
    DeleteQuestionParams,
    EditQuestionParams,
    GetQuestionByIdParams,
    GetQuestionsParams,
    QuestionVoteParams,
  } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { sortOptions } from "@/utils/sortOptions";



export async function getQuestions(params: GetQuestionsParams) {
    try {
      connectToDatabase();
      const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({createdAt: -1});

      return {questions};
      

    } catch (error) {
        console.log(error)
        throw error;
    }


}











export async function createQuestion(params: CreateQuestionParams) {
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
    revalidatePath(path)

  } catch (error) {

  }

}
