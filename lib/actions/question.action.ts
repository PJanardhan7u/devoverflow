"use server"


import { connectToDatabase } from "../mongoose"



export async function createQuestion() {
    try{
        // connect db
        connectToDatabase()

    }
    catch(error){

    }
}